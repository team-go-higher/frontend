interface IProcessStage {
  [key: string]: {
    detailed: null | string[];
  };
}

export const processStage: IProcessStage = {
  지원예정: { detailed: null },
  서류전형: { detailed: null },
  '과제 및 테스트': { detailed: ['코딩 테스트', '역량 검사', '사전 과제'] },
  면접전형: { detailed: ['1차 면접', '2차 면접'] },
  최종발표: { detailed: ['합격', '불합격'] },
};

export const processStageKeys = Object.keys(processStage);
