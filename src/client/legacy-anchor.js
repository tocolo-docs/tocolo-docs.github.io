// 0.8.0 のツールは「トップページ#通信の詳しい内容」を開く（説明書が 1 枚の HTML だった頃の場所）。
// ツールに書き込んだ URL は直せないので、トップでその見出しを開かれたら、今その節があるページへ送る
const legacyAnchors = {
  '通信の詳しい内容': '/features/update-notice#通信の詳しい内容',
};

function redirectLegacyAnchor() {
  if (typeof window === 'undefined') return;
  const {pathname, hash} = window.location;
  if (pathname !== '/' || !hash) return;
  let key;
  try {
    key = decodeURIComponent(hash.slice(1));
  } catch {
    return;
  }
  const to = legacyAnchors[key];
  if (to) window.location.replace(to);
}

// 最初に開いたときにも呼ばれるが、念のため読み込んだ時点でも見る
redirectLegacyAnchor();

export function onRouteDidUpdate() {
  redirectLegacyAnchor();
}
