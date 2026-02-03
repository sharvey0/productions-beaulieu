import {SupabaseErrorMessages} from "@/enums/supabase/SupabaseErrorMessages";
import {DemoAudioNames} from "@/enums/supabase/DemoAudioNames";

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