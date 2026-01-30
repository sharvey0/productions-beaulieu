export enum SupabaseErrorMessages {
    user_already_exists = "Cette adresse courriel est déjà utilisée. Essayez de vous connecter.",
    invalid_credentials = "L'adresse courriel ou le mot de passe est incorrect.",
    email_not_confirmed = "Vous devez d'abord valider votre adresse courriel. Un courriel vous a été envoyé.",
    over_request_rate_limit = "Vous avez envoyé trop de requêtes, veuillez patienter.",
    over_email_send_rate_limit="Un courriel a déjà été envoyé récemment. Veuillez patienter avant d'en demander un autre. Regardez dans vos courriels indésirables si vous ne le recevez pas.",
    emails_not_corresponding="L'adresse courriel ne correspond pas à l'adresse courriel du compte.",
    same_password="Le nouveau mot de passe ne peut pas être le même que l'ancien.",
    default = "Une erreur est survenue"
}