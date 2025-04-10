interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <p>Error: {message}</p>;
}

export default ErrorMessage;
