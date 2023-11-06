// '2023-09-15T05:08:35.922Z' -> '9월 15일 5:08'
export function formatDataType(dateStr: string): string {
  if (dateStr === null) return '전형일을 입력해주세요.';
  const inputDate: Date = new Date(dateStr);

  const month = inputDate.getMonth() + 1; // getMonth 결과값 0 = 1월, 1 = 2월, ...
  const date = inputDate.getDate();
  let hours = inputDate.getHours().toString();
  let minute = inputDate.getMinutes().toString();

  if (hours.length === 1) {
    hours = '0' + hours;
  }

  if (minute.length === 1) {
    minute = '0' + minute;
  }

  return `${month}월 ${date}일 ${hours}:${minute}`;
}
