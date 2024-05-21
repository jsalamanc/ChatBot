export type ChatAssistantProps = {
  id?: string;
  role?: string;
  content?: string;
  status?: number;
  statusText?: string;
}[];

export type MessagesProps = {
  response: ChatAssistantProps;
  loading: boolean;
};

export type InputTextProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
};
