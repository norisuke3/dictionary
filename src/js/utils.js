export default {
  timestampToDate: (timestamp) => {
    const date = new Date(timestamp);
    const yyyy = `${date.getFullYear()}`;
    // .slice(-2)で文字列中の末尾の2文字を取得する
    // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
    const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
    const dd = `0${date.getDate()}`.slice(-2);

    var now = new Date(Date.now());
    if (now.getFullYear() == date.getFullYear()){
      return `${MM}/${dd}`;
    } else {
      return `${yyyy}/${MM}/${dd}`;
    }
  },
  sha256: async function(text){
    const uint8  = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('');
  },
  getUniqueStr: function(strong = 1000){
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16);
  },
  // speak English words aloud
  utter: function(text){
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  },
  getStartOfDayTimestamp: function(timestamp) {
    const date = new Date(timestamp);
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    return startOfDay.getTime();
  },
  getDistribution: function(totalCount) {
    const values = [];

    // 10を1つだけ追加
    values.push(10);

    // 9, 8, 7, 6, 5を全体の2%以下でランダムに追加
    const twoPercentCount = Math.floor(totalCount * 0.02);
    const numbersForTwoPercent = [9, 8, 7, 6, 5];
    for (let i = 0; i < twoPercentCount; i++) {
      const randomIndex = Math.floor(Math.random() * numbersForTwoPercent.length);
      values.push(numbersForTwoPercent[randomIndex]);
    }

    // 4を全体の5%以下でランダムに追加
    const fivePercentCount = Math.floor(totalCount * 0.05);
    for (let i = 0; i < fivePercentCount; i++) {
      values.push(4);
    }

    // 3を全体の10%以下でランダムに追加
    const tenPercentCount = Math.floor(totalCount * 0.1);
    for (let i = 0; i < tenPercentCount; i++) {
      values.push(3);
    }

    // 2を全体の30%で追加
    const thirtyPercentCount = Math.floor(totalCount * 0.3);
    for (let i = 0; i < thirtyPercentCount; i++) {
      values.push(2);
    }

    // 残りの数を1で埋める
    while (values.length < totalCount) {
      values.push(1);
    }

  return values;
  }
}
