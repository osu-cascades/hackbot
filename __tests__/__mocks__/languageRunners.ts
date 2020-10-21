import { ILanguageRunners } from "@/library/languageLoader";

const langaugeRunners: ILanguageRunners = {
  testLang: { execute: jest.fn() },
  hipRunner: { execute: jest.fn() }
};

export default langaugeRunners;
