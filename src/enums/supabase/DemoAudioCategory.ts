export const DemoAudioCategoryMap = {
    "demo_audio1.opus": "jeux_video",
    "demo_audio2.opus": "jeux_video",
    "demo_audio3.opus": "noel",
    "demo_audio4.opus": "noel",
    "demo_audio5.opus": "jazz",
    "demo_audio6.opus": "jazz",
    "demo_audio7.opus": "pop",
} as const;

export type DemoAudioCategory = keyof typeof DemoAudioCategoryMap;
