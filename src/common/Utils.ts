export default class Utils{
    static calculateOutput (equation: string, inputValue: number): number {
        try {
          const sanitizedEquation = equation.replace(/x/g, inputValue.toString());
          return new Function(`return ${sanitizedEquation}`)();
        } catch {
          return 0;
        }
    }
}