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
  }
}
