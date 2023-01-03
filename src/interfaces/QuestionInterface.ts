export interface QuestionInterface {
  examName: string;
  questions: [
    {
      id: number;
      question: string;
      contexts: [
        {
          id: number;
          images: string;
          text: string;
        }
      ]
      options: [
        {
          id: number;
          option: string;
        }
      ]
    }
  ]
  
}

