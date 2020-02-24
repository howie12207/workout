export default function(time) {
  const date = new Date(time * 1000);
  // 輸出 => 年/月/日
  return date.toLocaleDateString();
}
