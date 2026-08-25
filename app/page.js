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
            <a href="#partner" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              파트너 병원
            </a>
            <a href="#global" style={{ fontSize: 13, color: "#16211D", textDecoration: "none", fontWeight: 600 }}>
              외국인 환자
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
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 800,
                color: "#1F5C4F",
                background: "#E9F3EF",
                padding: "5px 12px",
                borderRadius: 999,
                marginBottom: 18,
              }}
            >
              전국 12개 제휴 검진센터 · 실시간 예약
            </div>
            <h1
              style={{
                fontWeight: 900,
                fontSize: 46,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                margin: "0 0 18px",
              }}
            >
              오늘 자리가 빈<br />
              검진센터부터 <span style={{ color: "#1F5C4F" }}>보여드려요.</span>
            </h1>
            <p style={{ fontSize: 16, color: "#4A544E", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 440 }}>
              전화 돌리며 빈 시간 찾을 필요 없이, 검진 항목·지역별로 지금 예약 가능한 곳을
              한눈에 비교하고 바로 예약하세요.
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
            ["📄", "비자용 확인서", "예약 확정 시 진료확인서를 발급해드려요."],
          ].map(([icon, t, d]) => (
            <div key={t} style={{ background: "#fff", border: "1px solid #E3E1DA", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{t}</div>
              <div style={{ fontSize: 12.5, color: "#7C8B85", lineHeight: 1.55 }}>{d}</div>
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
