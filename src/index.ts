
require('module-alias/register')
import path from "path";
import { application } from "./lib/application";
import { DragonServer } from "./dragon-server";

application(path.join(__dirname), new DragonServer());
