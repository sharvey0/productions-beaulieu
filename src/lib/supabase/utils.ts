import {SupabaseErrorMessages} from "@/enums/supabase/SupabaseErrorMessages";
import {DemoAudioNames} from "@/enums/supabase/DemoAudioNames";
import {DemoAudioCategoryNames} from "@/enums/supabase/DemoAudioCategoryNames";

export function getSupabaseErrorMessage(errorCode: string) : string {
    if (errorCode in SupabaseErrorMessages) {
        return SupabaseErrorMessages[errorCode as keyof typeof SupabaseErrorMessages];
    }

    return SupabaseErrorMessages.default + " (" + errorCode + ")";
}

export function getDemoAudioFileName(filePath: string) : string {
    if (filePath in DemoAudioNames) {
        return DemoAudioNames[filePath as keyof typeof DemoAudioNames];
    }

    return filePath.replace('.opus', '');
}

export function getDemoCategoryName(category: string): string {
    if (category in DemoAudioCategoryNames) {
        return DemoAudioCategoryNames[category as keyof typeof DemoAudioCategoryNames];
    }

    return category;
}

export function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")      // replace spaces with _
    .replace(/&/g, "and")      // replace & with 'and'
    .replace(/[^\w_]/g, "");   // remove all other special chars
}
