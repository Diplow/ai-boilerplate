import { ContactService as _ContactService } from "./services";
import { withLogging } from "~/lib/logging";

export const ContactService = withLogging("ContactService", _ContactService);
