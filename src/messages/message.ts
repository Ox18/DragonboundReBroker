import { filteredWordsList } from "@/consts/filtered-words.const";
import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { cleanText, removeHTMLTags } from "@/utils/text.util";

export class Message {
  badWords: string[] = [];
  errors = {
    badWords: false,
    htmlTags: false,
  };

  constructor(
    public message: string,
    public readonly type: CHAT_TYPE = CHAT_TYPE.NORMAL,
    public readonly nickname: string = "",
    public readonly guildname: string = "",
    private readonly disabledHTML: boolean = true
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.cleanMessage();
    this.captureBadWords();
    this.captureHTMLTags();
    this.replaceBadWords();
    this.validateErrors();

    if (this.disabledHTML) {
      this.removeHTMLTags();
    }
  }

  private cleanMessage() {
    this.message = cleanText(this.message);
  }

  private replaceBadWords() {
    filteredWordsList.forEach((badWord) => {
      this.message = this.message.replace(badWord, "****");
    });
  }

  private captureBadWords() {
    filteredWordsList.forEach((badWord) => {
      if (this.message.includes(badWord)) {
        this.badWords.push(badWord);
      }
    });
  }

  private validateErrors() {
    this.errors.badWords = this.badWords.length > 0;
  }

  private captureHTMLTags() {
    if (this.disabledHTML) {
      const htmlTags = this.message.match(/<[^>]*>/g);
      this.errors.htmlTags = htmlTags && htmlTags.length > 0;
    }
  }

  private removeHTMLTags() {
    this.message = removeHTMLTags(this.message);
  }

  get() {
    return [this.message, this.nickname, this.type, this.guildname];
  }

  hasErrors() {
    return this.message.length === 0
  }
}
