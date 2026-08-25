"use client";

import React from "react";
import Link from "next/link";

// ---- Design tokens (matches /booking app for brand consistency) ----
// bg: #F5F6F3 / ink: #16211D / primary: #1F5C4F / accent: #FF4B3E / mint: #C9E4D8 / muted: #7C8B85
const FONT = "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif";

// Illustrative "this week's availability" grid — echoes the real dot-legend
// used inside the booking app, so the homepage's hero literally shows the
// product's core promise (compare real-time slots) rather than a generic banner.
const HERO_CENTERS = [
  { name: "강남센트럴안과", tag: "안검사", row: [2, 2, 1, 2, 0, 1, 2] },
  { name: "강남센트럴메디컬", tag: "종합검진", row: [1, 2, 2, 0, 2, 1, 2] },
  { name: "역삼 여성메디컬", tag: "여성검진", row: [2, 1, 2, 2, 1, 0, 2] },
  { name: "인천하버 헬스케어", tag: "종합검진", row: [0, 2, 1, 2, 2, 2, 1] },
  { name: "해운대 마린헬스", tag: "심혈관", row: [2, 2, 0, 1, 2, 2, 1] },
];
const DOT_COLOR = ["#E3E1DA", "#9FCBB8", "#1F5C4F"];
const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

function Section({ children, style }) {
  return (
    <section style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#F5F6F3", color: "#16211D", fontFamily: FONT }}>
      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(245,246,243,0.92)",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid #E3E1DA",
        }}
      >
        <Section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em", color: "#1F5C4F" }}>
            본닷
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="#how" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              이용 방법
            </a>
            <a href="#segments" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              대상별 혜택
            </a>
            <a href="#certified" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              인증병원
            </a>
            <a href="#partner" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              파트너 병원
            </a>
            <a href="#global" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              외국인 환자
            </a>
            <a href="#faq" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              자주 묻는 질문
            </a>
            <Link
              href="/booking"
              style={{
                background: "#FF4B3E",
                color: "#fff",
                padding: "9px 18px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              검진 예약하기
            </Link>
          </nav>
        </Section>
      </header>

      {/* HERO */}
      <Section style={{ padding: "64px 24px 56px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            {/* 문제 + 공감: 검진 예약의 실제 불편을 그대로 질문으로 던짐 */}
            <div style={{ fontSize: 15, color: "#7C8B85", fontWeight: 600, marginBottom: 14 }}>
              어디가 믿을 만한지, 가격은 합리적인지, 장비는 좋은지 — 매번 고민만 하다 미루신 적 있으시죠?
            </div>
            {/* 해결: 그 문제를 본닷이 어떻게 없애는지 */}
            <h1
              style={{
                fontWeight: 900,
                fontSize: 46,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                margin: "0 0 18px",
              }}
            >
              가장 빨리 만날 수 있는<br />
              <span style={{ color: "#1F5C4F" }}>건강, 여기 있어요.</span>
            </h1>
            <p style={{ fontSize: 16, color: "#4A544E", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 440 }}>
              본닷이 직접 확인한 인증병원의 강점·가격·장비 정보를 한눈에 비교하고,
              지금 예약 가능한 곳으로 바로 예약하세요.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
              <Link
                href="/booking"
                style={{
                  background: "#FF4B3E",
                  color: "#fff",
                  padding: "15px 28px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                지금 예약 가능한 곳 보기
              </Link>
              <a
                href="#global"
                style={{
                  border: "1px solid #1F5C4F",
                  color: "#1F5C4F",
                  padding: "15px 24px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                외국인 환자 안내
              </a>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                ["12", "제휴 검진센터"],
                ["7개", "검진 항목"],
                ["24h", "실시간 예약"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontWeight: 900, fontSize: 22, color: "#1F5C4F" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#7C8B85" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature element: live-feeling availability grid */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E3E1DA",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 12px 32px rgba(31,92,79,0.08)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>이번 주 예약 가능 현황</div>
              <div style={{ fontSize: 11, color: "#7C8B85" }}>실시간</div>
            </div>
            <div style={{ fontSize: 11, color: "#7C8B85", marginBottom: 16 }}>
              색이 진할수록 예약 가능한 시간대가 많아요
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(7, 16px)", gap: 6, alignItems: "center", marginBottom: 10 }}>
              <div />
              {DAY_LABELS.map((d) => (
                <div key={d} style={{ fontSize: 10, color: "#B7B5AC", textAlign: "center" }}>
                  {d}
                </div>
              ))}
            </div>

            {HERO_CENTERS.map((c) => (
              <div
                key={c.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr repeat(7, 16px)",
                  gap: 6,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#9AA39C" }}>{c.tag}</div>
                </div>
                {c.row.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 4,
                      background: DOT_COLOR[v],
                      justifySelf: "center",
                    }}
                  />
                ))}
              </div>
            ))}

            <Link
              href="/booking"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: 8,
                padding: "12px 0",
                borderRadius: 10,
                background: "#F1F8F5",
                color: "#1F5C4F",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              전체 현황 비교하기 →
            </Link>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how" style={{ padding: "56px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1F5C4F", marginBottom: 8 }}>이용 방법</div>
        <h2 style={{ fontWeight: 900, fontSize: 28, margin: "0 0 32px", letterSpacing: "-0.01em" }}>
          세 번이면 예약이 끝나요.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { t: "비교하기", d: "지역·검진 항목별로 실시간 예약 가능 현황을 한눈에 비교해요." },
            { t: "본인확인", d: "휴대폰 인증 한 번이면 끝. 다음 예약부터는 자동으로 넘어가요." },
            { t: "예약금 결제", d: "카드·카카오페이(외국인은 PayPal)로 결제하고 바로 확정돼요." },
          ].map((s, i) => (
            <div key={s.t} style={{ background: "#fff", border: "1px solid #E3E1DA", borderRadius: 16, padding: 24 }}>
              <div style={{ fontWeight: 900, fontSize: 22, color: "#C9E4D8", marginBottom: 12 }}>0{i + 1}</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 13.5, color: "#7C8B85", lineHeight: 1.6 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SEGMENT BENEFITS: B2B / students / public-service discounts */}
      <Section id="segments" style={{ padding: "56px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1F5C4F", marginBottom: 8 }}>이용 대상별 혜택</div>
        <h2 style={{ fontWeight: 900, fontSize: 28, margin: "0 0 32px", letterSpacing: "-0.01em" }}>
          누구에게나, 딱 맞는 방식으로.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              icon: "🏢",
              tag: "B2B",
              t: "기업 단체검진",
              d: "임직원 단체검진을 한 번에 예약하고, 정산도 회사 앞으로 간편하게 처리해요.",
              cta: "단체검진 문의하기",
            },
            {
              icon: "🎓",
              tag: "대학생",
              t: "대학생 할인가",
              d: "학생증 인증만 하면 할인가로 예약할 수 있어요. 첫 건강검진, 부담 없이 시작하세요.",
              cta: "대학생 할인 보기",
            },
            {
              icon: "🚓",
              tag: "경찰·소방관·군인",
              t: "특별 감사 할인",
              d: "국민의 안전을 지키는 분들께 감사한 마음으로 특별 할인가를 제공해요.",
              cta: "감사 할인 보기",
            },
          ].map((s) => (
            <div key={s.t} style={{ background: "#fff", border: "1px solid #E3E1DA", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 22, marginBottom: 12 }}>{s.icon}</div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#1F5C4F",
                  background: "#E9F3EF",
                  padding: "3px 9px",
                  borderRadius: 999,
                  marginBottom: 10,
                  width: "fit-content",
                }}
              >
                {s.tag}
              </div>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 13.5, color: "#7C8B85", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{s.d}</div>
              <Link href="/booking" style={{ fontSize: 13, fontWeight: 700, color: "#FF4B3E", textDecoration: "none" }}>
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* BONDOT CERTIFIED HOSPITALS */}
      <Section id="certified" style={{ padding: "56px 24px" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E3E1DA",
            borderRadius: 24,
            padding: "40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 800,
                color: "#1F5C4F",
                background: "#E9F3EF",
                padding: "5px 12px",
                borderRadius: 999,
                marginBottom: 16,
              }}
            >
              ✓ 본닷 인증병원
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 26, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              아무 병원이나 올리지 않아요.
            </h2>
            <p style={{ fontSize: 14.5, color: "#7C8B85", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 420 }}>
              후기가 부풀려졌거나 시설이 사진과 다른 경우, 다들 한 번쯤 겪어보셨을 거예요.
              본닷은 등록 전 직접 확인한 병원만 올리고, 인증 마크를 붙여드려요.
            </p>
            <div style={{ display: "flex", gap: 28 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: "#1F5C4F" }}>12곳</div>
                <div style={{ fontSize: 12, color: "#7C8B85" }}>인증 완료</div>
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: "#1F5C4F" }}>300곳</div>
                <div style={{ fontSize: 12, color: "#7C8B85" }}>2026년 목표</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["전문의 상주 확인", "실제로 전문의가 상주하며 진료·판독하는지 방문 확인해요."],
              ["시설·장비 점검", "홈페이지 사진과 실제 시설·장비가 일치하는지 점검해요."],
              ["실제 방문자 후기만", "방문 이력이 확인된 예약자의 후기만 노출해요."],
            ].map(([t, d]) => (
              <div key={t} style={{ background: "#F5F6F3", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>✓ {t}</div>
                <div style={{ fontSize: 12.5, color: "#7C8B85", lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dr.Edge YouTube tie-in: content-to-booking funnel */}
        <div
          style={{
            marginTop: 20,
            background: "#16211D",
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#FF4B3E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              📺
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#9FCBB8", marginBottom: 4 }}>
                닥터엣지 × 본닷 인증병원
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                유튜브 닥터엣지가 직접 찾아가 본닷 인증병원을 소개해요.
              </div>
              <div style={{ fontSize: 12.5, color: "#B7C4BC", marginTop: 4 }}>
                영상에서 본 병원, 여기서 바로 예약하실 수 있어요.
              </div>
            </div>
          </div>
          <a
            href="https://youtube.com/@dredge"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#fff",
              color: "#16211D",
              padding: "12px 22px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 800,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            닥터엣지 채널 보기
          </a>
        </div>
      </Section>

      {/* PARTNER SPOTLIGHT */}
      <Section id="partner" style={{ padding: "56px 24px" }}>
        <div
          style={{
            background: "#1F5C4F",
            borderRadius: 24,
            padding: "40px 40px",
            color: "#fff",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 800,
                background: "rgba(255,255,255,0.15)",
                padding: "5px 10px",
                borderRadius: 999,
                marginBottom: 16,
              }}
            >
              🤝 본닷 파트너 병원
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 26, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              강남센트럴안과
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#DCEEE7", margin: "0 0 20px", maxWidth: 420 }}>
              라식·백내장 재수술 등 고난도 케이스를 전문으로 다루는 안과예요. 국제환자
              전담 코디네이터가 예약부터 통역, 사후관리까지 함께합니다.
            </p>
            <Link
              href="/booking"
              style={{
                display: "inline-block",
                background: "#fff",
                color: "#1F5C4F",
                padding: "12px 22px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              강남센트럴안과 예약 보기
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "라식·백내장 재수술 고난도 케이스 전문",
              "국제환자 전담 코디네이터 배정",
              "영어 상담 가능",
            ].map((line) => (
              <div
                key={line}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                ✓ {line}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GLOBAL / INTERNATIONAL PATIENTS */}
      <Section id="global" style={{ padding: "56px 24px 80px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1F5C4F", marginBottom: 8 }}>
        🌐 FOR INTERNATIONAL PATIENTS
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 28, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
          한국 검진, 외국인도 어렵지 않게.
        </h2>
        <p style={{ fontSize: 14.5, color: "#7C8B85", margin: "0 0 32px", maxWidth: 520 }}>
          English로 예약하고, WhatsApp으로 문의하고, 공항 픽업까지 — 본닷이 한국 방문
          전 과정을 함께합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            ["🌐", "English 지원", "화면 전체를 영어로 전환해서 이용할 수 있어요."],
            ["🟢", "WhatsApp 문의", "카카오톡 대신 WhatsApp으로 편하게 문의하세요."],
            ["🛬", "공항 픽업", "예약 시 공항 픽업 서비스를 함께 신청할 수 있어요."],
            ["📄", "비자용 확인서", "예약 확정 시 진료확인서와 인보이스를 발급해드려요."],
          ].map(([icon, t, d]) => (
            <div key={t} style={{ background: "#fff", border: "1px solid #E3E1DA", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{t}</div>
              <div style={{ fontSize: 12.5, color: "#7C8B85", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRE-CHECKUP WORRIES FAQ */}
      <Section id="faq" style={{ padding: "56px 24px 80px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1F5C4F", marginBottom: 8 }}>검진 전, 이런 게 궁금하시죠</div>
        <h2 style={{ fontWeight: 900, fontSize: 28, margin: "0 0 32px", letterSpacing: "-0.01em" }}>
          예약보다 먼저 드는 걱정들.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            [
              "결과가 안 좋게 나올까 봐 미루고 있어요.",
              "이상 소견은 조기에 발견할수록 치료가 쉬워져요. 결과는 앱에서 바로 확인하고, 필요하면 후속 진료도 안내해드려요.",
            ],
            [
              "수면내시경, 무섭지 않을까요?",
              "본닷 인증병원은 마취(수면유도) 전문의가 상주하고 검사 중 활력징후를 계속 확인하는 곳만 등록해요.",
            ],
            [
              "저렴하게 예약했는데 현장에서 비싼 옵션을 권유받진 않을까요?",
              "본닷에 표시된 가격이 최종 가격이에요. 사전 고지 없는 추가 항목이나 강매는 없습니다.",
            ],
            [
              "제게 어떤 검진 항목이 필요한지 모르겠어요.",
              "센터 상세 페이지의 카카오톡·WhatsApp 문의 버튼으로 먼저 물어보시면, 예약 전에 미리 상담받으실 수 있어요.",
            ],
          ].map(([q, a]) => (
            <div key={q} style={{ background: "#fff", border: "1px solid #E3E1DA", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 6 }}>Q. {q}</div>
              <div style={{ fontSize: 13.5, color: "#7C8B85", lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E3E1DA", padding: "32px 24px" }}>
        <Section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#1F5C4F", marginBottom: 4 }}>본닷</div>
            <div style={{ fontSize: 12, color: "#7C8B85" }}>전국 검진 비교·예약 플랫폼</div>
          </div>
          <div style={{ fontSize: 12, color: "#9AA39C" }}>© 2026 BONDOT. All rights reserved.</div>
        </Section>
      </footer>
    </div>
  );
}
