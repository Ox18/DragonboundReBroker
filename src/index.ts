
require('module-alias/register')
import path from "path";
import { application } from "./lib/application";

application(path.join(__dirname))
