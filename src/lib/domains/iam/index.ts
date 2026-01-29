import { IamService as _IamService } from "./services";
import { withLogging } from "~/lib/logging";

export const IamService = withLogging("IamService", _IamService);
