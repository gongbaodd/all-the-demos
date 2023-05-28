export interface IWordRecord {
  word: string;
  timeStamp: number;
  // 正常章节为 dictKey, 其他功能则为对应的类型
  dict: string;
  // 用户可能是在 错题/其他类似组件中 进行的练习则为 null, start from 0
  chapter: number | null;
  // 正确次数中输入每个字母的时间差，可以据此计算出总时间
  timing: number[];
  // 出错的次数
  wrongCount: number;
  // 每个字母被错误输入成什么, index 为字母的索引, 数组内为错误的 e.key
  mistakes: LetterMistakes;
}

export interface LetterMistakes {
  // 每个字母被错误输入成什么, index 为字母的索引, 数组内为错误的 e.key
  [index: number]: string[];
}

export interface IChapterRecord {
  // 正常章节为 dictKey, 其他功能则为对应的类型
  dict: string;
  // 用户可能是在 错题/其他类似组件中 进行的练习则为 null
  chapter: number | null;
  timeStamp: number;
  // 单位为 s，章节的记录没必要到毫秒级
  time: number;
  // 正确按键次数，输对一个字母即记录
  correctCount: number;
  // 错误的按键次数。 出错会清空整个输入，但只记录一次错误
  wrongCount: number;
  // 用户输入的单词总数，可能会使用循环等功能使输入总数大于 20
  wordCount: number;
  // 一次打对未犯错的单词列表, 可以和 wordNumber 对比得出出错的单词 indexes
  correctWordIndexes: number[];
  // 章节总单词数
  wordNumber: number;
  // 单词 record 的 id 列表
  wordRecordIds: number[];
}
