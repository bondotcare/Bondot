export const metadata = {
  title: "본닷 | 전국 검진 비교 예약",
  description: "전국 제휴 검진센터의 실시간 예약 가능 현황을 비교하고 예약하세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
