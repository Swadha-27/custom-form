class ErrorUtils {
  static required(requiredMessage: string) {
    return (value: any) => {
      if (!value) return requiredMessage;
    };
  }
}

export default ErrorUtils;
