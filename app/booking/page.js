"use client";

import React, { useState, useMemo, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

// ---- Catchtable-style tokens ----
// bg: #FFFFFF / surface: #F7F7F8 / ink: #1A1A1A / muted: #8B8B8F
// accent(CTA/booking): #FF4B3E / available: #12B76A / urgent: #FF4B3E
const FONT = "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif";

const REGIONS = ["전체", "서울", "경기·인천", "부산·경남", "대구·경북", "광주·전라", "대전·충청", "제주"];
const CATEGORIES = ["전체", "종합검진", "위/대장 내시경", "심혈관", "여성검진", "뇌MRI", "안검사", "치과검진", "혈액검사"];

const REGION_LABEL = {
  ko: { "전체": "전체", "서울": "서울", "경기·인천": "경기·인천", "부산·경남": "부산·경남", "대구·경북": "대구·경북", "광주·전라": "광주·전라", "대전·충청": "대전·충청", "제주": "제주" },
  en: { "전체": "All", "서울": "Seoul", "경기·인천": "Gyeonggi·Incheon", "부산·경남": "Busan·Gyeongnam", "대구·경북": "Daegu·Gyeongbuk", "광주·전라": "Gwangju·Jeolla", "대전·충청": "Daejeon·Chungcheong", "제주": "Jeju" },
};
const CATEGORY_LABEL = {
  ko: { "전체": "전체", "종합검진": "종합검진", "위/대장 내시경": "위/대장 내시경", "심혈관": "심혈관", "여성검진": "여성검진", "뇌MRI": "뇌MRI", "안검사": "안검사", "치과검진": "치과검진", "혈액검사": "혈액검사" },
  en: { "전체": "All", "종합검진": "General Checkup", "위/대장 내시경": "Endoscopy", "심혈관": "Cardiac", "여성검진": "Women's Health", "뇌MRI": "Brain MRI", "안검사": "Eye Exam", "치과검진": "Dental", "혈액검사": "Blood Test" },
};

const T = {
  ko: {
    tagline: "전국 검진 비교 예약",
    myBookings: "내 예약 내역",
    headline: "원하는 검진, 가장 빠른 자리로.",
    subtext: "전국 제휴 검진센터의 실시간 예약 가능 현황을 비교하세요.",
    searchPlaceholder: "검진센터, 지역, 검진 항목 검색",
    regionLabel: "지역",
    categoryLabel: "검진 항목",
    legend: "다음 7일 예약 가능 현황",
    legendClosed: "마감",
    legendSome: "여유",
    legendMany: "많음",
    englishSupport: "🌐 영어 상담 가능",
    dateSelect: "날짜 선택",
    timeSelect: "시간 선택",
    loadingSlots: "예약 가능 시간을 불러오는 중…",
    checkupCost: "검진 비용",
    duration: "소요 시간",
    selectTime: "시간을 선택하세요",
    bookAt: (t) => `${t} 예약하기`,
    back: "← 목록으로",
    confirmTitle: "예약 정보 확인",
    nameLabel: "예약자 이름",
    phoneLabel: "연락처 (010-0000-0000)",
    foreignToggle: "외국인 환자이신가요?",
    nationalityLabel: "국적",
    passportLabel: "여권 번호",
    visaNote: "예약 확정 시 진료확인서(비자용)를 함께 보내드릴 수 있어요.",
    airportPickup: "공항 픽업 서비스 신청",
    interpreterService: "통역 동행 서비스 신청",
    approxUsd: (amt) => `약 $${amt} (참고용)`,
    payPaypal: "PayPal / 해외카드",
    intlPaymentNote: "해외 발급 카드도 결제 가능해요.",
    whatsappContact: "WhatsApp으로 문의하기",
    kakaoContact: "카카오톡으로 문의하기",
    idUploadLabel: "본인확인",
    sendCode: "인증번호 받기",
    resendCode: "다시 받기",
    codeSentNote: (code) => `인증번호가 발송됐어요. (테스트용 인증번호: ${code})`,
    codeLabel: "인증번호 6자리",
    verifyCode: "인증 확인",
    verified: "본인확인 완료",
    otpMismatch: "인증번호가 일치하지 않아요. 다시 확인해주세요.",
    nextToPayment: "다음: 예약금 결제",
    paymentTitle: "예약금 결제",
    depositLabel: "예약금 (검진비의 10%)",
    remainingLabel: "잔액은 검진 당일 현장 결제",
    paymentMethod: "결제 수단",
    payCard: "신용카드",
    payKakao: "카카오페이",
    payNaver: "네이버페이",
    payButton: (amt) => `${amt} 결제하기`,
    paying: "결제 처리 중…",
    depositPaidNote: (amt) => `예약금 ${amt} 결제가 완료됐어요.`,
    idConfirmed: "신분증 확인 완료",
    confirmBtn: "예약 확정하기",
    submitting: "예약 처리 중…",
    confirmedTitle: "예약이 확정됐어요",
    confirmedSub: (p) => `확정 안내가 ${p}(으)로 발송됩니다.`,
    reservedBy: "예약자",
    browseMore: "다른 검진센터 둘러보기",
    bookingsTitle: "예약 내역",
    bookingsLoading: "불러오는 중…",
    bookingsEmpty: "아직 예약 내역이 없어요.",
    myTabPlaceholder: "회원 정보, 알림 설정은 준비 중이에요.",
    navHome: "홈",
    navBookings: "예약내역",
    navMy: "MY",
    intlSectionTitle: "🌐 외국인 환자를 위한 English-Friendly 센터",
    intlSectionSub: "영어 상담이 가능하고 국제환자 응대 경험이 있는 검진센터예요.",
    partnerBadge: "🤝 본닷 파트너 병원",
    coordinatorTitle: "국제환자 코디네이터 안내",
  },
  en: {
    tagline: "Compare & Book Checkups Nationwide",
    myBookings: "My Bookings",
    headline: "Find your checkup. Book the fastest slot.",
    subtext: "Compare real-time availability at partner checkup centers across Korea.",
    searchPlaceholder: "Search center, region, or checkup type",
    regionLabel: "Region",
    categoryLabel: "Checkup Type",
    legend: "Next 7 days availability",
    legendClosed: "Full",
    legendSome: "Limited",
    legendMany: "Open",
    englishSupport: "🌐 English support available",
    dateSelect: "Select Date",
    timeSelect: "Select Time",
    loadingSlots: "Loading available times…",
    checkupCost: "Checkup Cost",
    duration: "Duration",
    selectTime: "Please select a time",
    bookAt: (t) => `Book at ${t}`,
    back: "← Back to list",
    confirmTitle: "Confirm Booking",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    foreignToggle: "Are you an international patient?",
    nationalityLabel: "Nationality",
    passportLabel: "Passport number",
    visaNote: "We can send a medical visit confirmation letter for visa purposes once booked.",
    airportPickup: "Request airport pickup service",
    interpreterService: "Request interpreter service",
    approxUsd: (amt) => `approx. $${amt} (for reference)`,
    payPaypal: "PayPal / International Card",
    intlPaymentNote: "Cards issued outside Korea are accepted.",
    whatsappContact: "Contact via WhatsApp",
    kakaoContact: "Contact via KakaoTalk",
    idUploadLabel: "Identity Verification",
    sendCode: "Send verification code",
    resendCode: "Resend code",
    codeSentNote: (code) => `Verification code sent. (Demo code: ${code})`,
    codeLabel: "6-digit code",
    verifyCode: "Verify",
    verified: "Identity verified",
    otpMismatch: "Code doesn't match. Please try again.",
    nextToPayment: "Next: Pay deposit",
    paymentTitle: "Deposit Payment",
    depositLabel: "Deposit (10% of checkup fee)",
    remainingLabel: "Remaining balance due on-site at checkup",
    paymentMethod: "Payment method",
    payCard: "Credit card",
    payKakao: "Kakao Pay",
    payNaver: "Naver Pay",
    payButton: (amt) => `Pay ${amt}`,
    paying: "Processing payment…",
    depositPaidNote: (amt) => `Deposit of ${amt} has been paid.`,
    idConfirmed: "ID verified",
    confirmBtn: "Confirm Booking",
    submitting: "Processing…",
    confirmedTitle: "Booking confirmed",
    confirmedSub: (p) => `A confirmation will be sent to ${p}.`,
    reservedBy: "Booked by",
    browseMore: "Browse more centers",
    bookingsTitle: "My Bookings",
    bookingsLoading: "Loading…",
    bookingsEmpty: "No bookings yet.",
    myTabPlaceholder: "Account settings and notifications are coming soon.",
    navHome: "Home",
    navBookings: "Bookings",
    navMy: "MY",
    intlSectionTitle: "🌐 English-Friendly Centers for International Patients",
    intlSectionSub: "Centers with English-speaking staff and experience with international patients.",
    partnerBadge: "🤝 BondDot Partner Hospital",
    coordinatorTitle: "International Patient Coordinator",
  },
};

const CATEGORY_STYLE = {
  "종합검진": { icon: "🩺", grad: "linear-gradient(135deg,#2B3A67,#4A6FA5)" },
  "위/대장 내시경": { icon: "🔬", grad: "linear-gradient(135deg,#3A5A40,#6B9080)" },
  "심혈관": { icon: "❤️", grad: "linear-gradient(135deg,#7A2E2E,#B5495B)" },
  "여성검진": { icon: "🌸", grad: "linear-gradient(135deg,#7B4B94,#B185A7)" },
  "뇌MRI": { icon: "🧠", grad: "linear-gradient(135deg,#264653,#4A7C82)" },
  "안검사": { icon: "👁", grad: "linear-gradient(135deg,#1F5C4F,#4C9C8C)" },
  "치과검진": { icon: "🦷", grad: "linear-gradient(135deg,#3D5A80,#98C1D9)" },
  "혈액검사": { icon: "🩸", grad: "linear-gradient(135deg,#8C2F39,#C1555F)" },
};

const CENTERS = [
  { id: 1, name: "강남센트럴메디컬 종합검진센터", nameEn: "Gangnam Central Medical Checkup Center", region: "서울", area: "서울 강남구 테헤란로", tags: ["종합검진", "위/대장 내시경"], price: 890000, duration: "3~4시간", highlight: "수면내시경 결과, 당일 원장 직접 상담", highlightEn: "Same-day results consultation directly with the doctor", englishSupport: true },
  { id: 2, name: "삼성역 하트앤베슬 심혈관센터", region: "서울", area: "서울 강남구 삼성동", tags: ["심혈관"], price: 650000, duration: "2시간", highlight: "관상동맥 CT 기본 포함, 숨은 혈관질환까지 확인" },
  { id: 3, name: "역삼 여성메디컬 검진센터", region: "서울", area: "서울 강남구 역삼동", tags: ["여성검진", "종합검진"], price: 720000, duration: "2~3시간", highlight: "여성 전문의가 처음부터 끝까지 전담 판독" },
  { id: 4, name: "청담 브레인케어 뇌MRI센터", region: "서울", area: "서울 강남구 청담동", tags: ["뇌MRI"], price: 550000, duration: "1~2시간", highlight: "3.0T MRI로 미세 뇌혈관까지 정밀 판독" },
  { id: 5, name: "논현 위대장 내시경클리닉", region: "서울", area: "서울 강남구 논현동", tags: ["위/대장 내시경"], price: 380000, duration: "1~2시간", highlight: "무통 수면내시경만 20년, 재검사율 최저" },
  { id: 6, name: "분당서울퍼스트 검진센터", region: "경기·인천", area: "경기 성남시 분당구", tags: ["종합검진"], price: 780000, duration: "3시간", highlight: "검진 당일 정밀 결과지 바로 발급" },
  { id: 7, name: "인천하버 헬스케어센터", nameEn: "Incheon Harbor Healthcare Center", region: "경기·인천", area: "인천 연수구 송도동", tags: ["종합검진", "여성검진"], price: 690000, duration: "2~3시간", highlight: "송도 국제업무단지, 외국인 검진객도 다수", highlightEn: "Located in Songdo IBD, many international patients", englishSupport: true },
  { id: 8, name: "해운대 마린헬스 검진센터", region: "부산·경남", area: "부산 해운대구", tags: ["종합검진", "심혈관"], price: 710000, duration: "3시간", highlight: "검진 후 오션뷰 회복실에서 여유롭게 휴식" },
  { id: 9, name: "대구센트럴 메디케어", region: "대구·경북", area: "대구 수성구", tags: ["종합검진", "위/대장 내시경"], price: 620000, duration: "2~3시간", highlight: "대형 종합병원과 바로 연계, 이상소견 시 신속 전원" },
  { id: 10, name: "광주스퀘어 검진의원", region: "광주·전라", area: "광주 서구", tags: ["종합검진"], price: 590000, duration: "2시간", highlight: "소규모 운영이라 당일 예약도 잡히는 편" },
  { id: 11, name: "대전유성 웰니스검진센터", region: "대전·충청", area: "대전 유성구", tags: ["종합검진", "뇌MRI"], price: 750000, duration: "3~4시간", highlight: "유성온천역 도보 5분, 검진 후 온천으로 힐링" },
  { id: 12, name: "제주하늘 검진클리닉", region: "제주", area: "제주 제주시", tags: ["종합검진", "여성검진"], price: 680000, duration: "2~3시간", highlight: "검진 겸 제주 여행, 일정 맞춰 예약 가능" },
  { id: 13, name: "강남센트럴안과 눈건강검진센터", nameEn: "Gangnam Central Eye Checkup Center", region: "서울", area: "서울 강남구 테헤란로", tags: ["안검사"], price: 320000, duration: "1시간", highlight: "라식·백내장 재수술 등 고난도 케이스 전문", highlightEn: "Specializes in complex re-surgery cases (LASIK, cataract)", englishSupport: true, isPartner: true, coordinatorNote: "국제환자 전담 코디네이터가 예약부터 통역, 사후관리까지 동행합니다.", coordinatorNoteEn: "A dedicated international patient coordinator supports you from booking through translation and aftercare." },
  { id: 14, name: "온빛안과 검진센터", region: "부산·경남", area: "부산 해운대구", tags: ["안검사"], price: 280000, duration: "1시간", highlight: "노안·백내장 당일 정밀 검사" },
  { id: 15, name: "역삼 화이트스마일 치과검진센터", region: "서울", area: "서울 강남구 역삼동", tags: ["치과검진"], price: 150000, duration: "40분~1시간", highlight: "파노라마 촬영 포함 구강 정밀검진" },
  { id: 16, name: "대전 브라이트덴탈 치과검진센터", region: "대전·충청", area: "대전 서구", tags: ["치과검진"], price: 130000, duration: "40분~1시간", highlight: "검진 당일 임플란트 상담까지 한 번에" },
  { id: 17, name: "인천하버 혈액검진랩", region: "경기·인천", area: "인천 연수구 송도동", tags: ["혈액검사"], price: 90000, duration: "20~30분", highlight: "당일 채혈, 익일 앱으로 결과 확인" },
];

function seedAvailability(centerId) {
  const seedBase = centerId * 13;
  return Array.from({ length: 7 }, (_, i) => {
    const v = (seedBase + i * 7) % 5;
    if (v === 0) return 0;
    if (v <= 2) return 1;
    return 2;
  });
}
function todayUrgency(centerId) {
  return seedAvailability(centerId)[0]; // 0 마감 / 1 여유(마감임박) / 2 많음
}

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDate(d) {
  const wd = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return { md: `${d.getMonth() + 1}.${d.getDate()}`, wd };
}
// Reference-only conversion for display; not a live FX rate.
const KRW_PER_USD = 1380;
function approxUsd(krw) {
  return Math.round(krw / KRW_PER_USD).toLocaleString();
}
function baseSlots(centerId, dayIndex) {
  const base = ["09:00", "09:30", "10:30", "11:00", "13:30", "14:00", "15:00", "15:30", "16:00"];
  return base.map((t, i) => {
    const key = (centerId * 31 + dayIndex * 17 + i * 7) % 5;
    return { time: t, available: key !== 0 };
  });
}

function Badge({ centerId }) {
  const u = todayUrgency(centerId);
  if (u === 0) return <span style={badgeStyle("#8B8B8F", "#F0F0F1")}>오늘 마감</span>;
  if (u === 1) return <span style={badgeStyle("#FF4B3E", "#FFEDEB")}>⚡ 마감임박</span>;
  return <span style={badgeStyle("#12B76A", "#E8F8F0")}>실시간 예약가능</span>;
}
const badgeStyle = (color, bg) => ({
  fontSize: 11,
  fontWeight: 800,
  color,
  background: bg,
  padding: "4px 8px",
  borderRadius: 6,
  display: "inline-block",
});

function PhotoCard({ tags, height = 140 }) {
  const primaryTag = tags[0];
  const style = CATEGORY_STYLE[primaryTag] || CATEGORY_STYLE["종합검진"];
  return (
    <div
      style={{
        height,
        borderRadius: "16px 16px 0 0",
        background: style.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: height > 100 ? 40 : 28,
        position: "relative",
      }}
    >
      {style.icon}
    </div>
  );
}

export default function CheckupBookingApp() {
  const [lang, setLang] = useState("ko");
  const t = T[lang];
  const [region, setRegion] = useState("전체");
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [tab, setTab] = useState("home"); // home | bookings | my
  const [view, setView] = useState("list"); // list | detail | confirm
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", isForeign: false, nationality: "", passport: "", airportPickup: false, interpreter: false });
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paying, setPaying] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const [myBookings, setMyBookings] = useState([]);
  const [myBookingsLoading, setMyBookingsLoading] = useState(false);

  const days = useMemo(() => getNext7Days(), []);

  const filtered = CENTERS.filter((c) => {
    const matchRegion = region === "전체" || c.region === region;
    const matchCat = category === "전체" || c.tags.includes(category);
    const matchQuery =
      query.trim() === "" || c.name.includes(query) || c.area.includes(query) || c.tags.some((t) => t.includes(query));
    return matchRegion && matchCat && matchQuery;
  });

  async function fetchSlotStatus(centerId, dateStr) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("center_id", centerId)
        .eq("booking_date", dateStr);
      if (error) throw error;
      return (data || []).map((row) => row.booking_time);
    } catch (e) {
      return [];
    }
  }
  async function loadSlotsFor(centerId, dayIdx) {
    setSlotsLoading(true);
    try {
      const base = baseSlots(centerId, dayIdx);
      const dateStr = toDateStr(days[dayIdx]);
      const bookedTimes = await fetchSlotStatus(centerId, dateStr);
      setSlots(base.map((s) => ({ ...s, available: s.available && !bookedTimes.includes(s.time) })));
    } catch (e) {
      setSlots(baseSlots(centerId, dayIdx));
    } finally {
      setSlotsLoading(false);
    }
  }

  useEffect(() => {
    if (view === "detail" && selectedCenter) {
      loadSlotsFor(selectedCenter.id, selectedDayIdx);
      setSelectedTime(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, selectedCenter, selectedDayIdx]);

  // load saved verified profile once, so returning users skip OTP
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("bondot-verified-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        setForm((f) => ({ ...f, name: profile.name || "", phone: profile.phone || "" }));
        if (profile.phone) setPhoneVerified(true);
      }
    } catch (e) {
      // no saved profile yet
    }
  }, []);

  const openDetail = (center) => {
    setBookingError("");
    setSelectedCenter(center);
    setSelectedDayIdx(0);
    setSelectedTime(null);
    setView("detail");
    setTab("home");
  };
  const goBookConfirm = () => {
    if (!selectedTime) return;
    setBookingError("");
    setView("confirm");
  };

  function calcDeposit(price) {
    return Math.round((price * 0.1) / 1000) * 1000;
  }

  const handleSendOtp = () => {
    if (!form.phone.trim()) return;
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpInput("");
    setOtpError("");
    setPhoneVerified(false);
  };

  const handleVerifyOtp = async () => {
    if (otpInput.trim() === generatedOtp) {
      setPhoneVerified(true);
      setOtpError("");
      try {
        window.localStorage.setItem("bondot-verified-profile", JSON.stringify({ name: form.name, phone: form.phone }));
      } catch (e) {
        // saving the profile is a convenience, not required for this booking to proceed
      }
    } else {
      setOtpError(t.otpMismatch);
    }
  };

  const goToPayment = () => {
    if (!form.name.trim() || !form.phone.trim() || !phoneVerified) return;
    if (form.isForeign && (!form.nationality.trim() || !form.passport.trim())) return;
    setBookingError("");
    setView("payment");
  };

  const submitBooking = async () => {
    if (!form.name.trim() || !form.phone.trim() || !selectedCenter || !selectedTime) return;
    setSubmitting(true);
    setBookingError("");
    const dateStr = toDateStr(days[selectedDayIdx]);
    try {
      const row = {
        center_id: selectedCenter.id,
        center_name: selectedCenter.name,
        area: selectedCenter.area,
        tags: selectedCenter.tags,
        booking_date: dateStr,
        date_label: `${formatDate(days[selectedDayIdx]).md} (${formatDate(days[selectedDayIdx]).wd})`,
        booking_time: selectedTime,
        price: selectedCenter.price,
        deposit: calcDeposit(selectedCenter.price),
        payment_method: paymentMethod,
        name: form.name,
        phone: form.phone,
        is_foreign: form.isForeign,
        nationality: form.nationality,
        passport: form.passport,
        airport_pickup: form.airportPickup,
        interpreter: form.interpreter,
      };

      const { data, error } = await supabase.from("bookings").insert(row).select().single();

      if (error) {
        // unique_slot violation = someone else booked this exact slot first
        if (error.code === "23505") {
          setBookingError("방금 다른 예약자가 이 시간을 먼저 예약했어요. 다른 시간을 선택해주세요.");
          await loadSlotsFor(selectedCenter.id, selectedDayIdx);
          setView("detail");
          setSubmitting(false);
          return;
        }
        throw error;
      }

      const record = {
        id: data.id,
        centerId: data.center_id,
        centerName: data.center_name,
        area: data.area,
        tags: data.tags,
        date: data.booking_date,
        dateLabel: data.date_label,
        time: data.booking_time,
        price: data.price,
        deposit: data.deposit,
        paymentMethod: data.payment_method,
        phoneVerified: true,
        name: data.name,
        phone: data.phone,
        isForeign: data.is_foreign,
        nationality: data.nationality,
        passport: data.passport,
        airportPickup: data.airport_pickup,
        interpreter: data.interpreter,
      };
      setConfirmedBooking(record);
    } catch (err) {
      setBookingError("예약 처리 중 문제가 발생했어요. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const payAndConfirm = async () => {
    setPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 900)); // simulate payment processing
    setPaying(false);
    await submitBooking();
  };

  const openMyBookings = async () => {
    setBookingError("");
    setTab("bookings");
    setView("list");
    setMyBookingsLoading(true);
    try {
      if (!form.phone.trim()) {
        setMyBookings([]);
        return;
      }
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("phone", form.phone)
        .order("created_at", { ascending: true });
      if (error) throw error;
      setMyBookings(
        (data || []).map((row) => ({
          id: row.id,
          centerName: row.center_name,
          area: row.area,
          tags: row.tags,
          dateLabel: row.date_label,
          time: row.booking_time,
          price: row.price,
          deposit: row.deposit,
        }))
      );
    } catch (e) {
      setMyBookings([]);
    } finally {
      setMyBookingsLoading(false);
    }
  };

  const resetAll = () => {
    setTab("home");
    setView("list");
    setSelectedCenter(null);
    setSelectedTime(null);
    // keep name/phone/phoneVerified so returning users skip OTP next time
    setForm((f) => ({ name: f.name, phone: f.phone, isForeign: false, nationality: "", passport: "", airportPickup: false, interpreter: false }));
    setOtpSent(false);
    setOtpInput("");
    setOtpError("");
    setPaymentMethod("card");
    setConfirmedBooking(null);
    setBookingError("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#1A1A1A", fontFamily: FONT, paddingBottom: 72 }}>
      {/* Top bar */}
      <header style={{ padding: "18px 16px 0", background: "#fff", borderBottom: "1px solid #F0F0F1" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16, cursor: "pointer" }} onClick={resetAll}>
          <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em", color: "#1F5C4F" }}>본닷</span>
          <span style={{ fontSize: 12, color: "#8B8B8F" }}>{t.tagline}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setLang(lang === "ko" ? "en" : "ko"); }}
              style={{ border: "1px solid #EEEEEE", background: "#fff", borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              {lang === "ko" ? "EN" : "한국어"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openMyBookings(); }}
              style={{ border: "1px solid #EEEEEE", background: "#fff", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              {t.myBookings}
            </button>
          </div>
        </div>
      </header>

      {tab === "home" && view === "list" && (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 0" }}>
          <h1 style={{ fontWeight: 900, fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1.3, margin: "0 0 6px" }}>
            {t.headline}
          </h1>
          <p style={{ color: "#8B8B8F", fontSize: 13, margin: "0 0 18px" }}>
            {t.subtext}
          </p>

          <div style={{ display: "flex", alignItems: "center", background: "#F7F7F8", borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
            <span style={{ marginRight: 8, color: "#8B8B8F" }}>🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, width: "100%", color: "#1A1A1A" }}
            />
          </div>

          <div style={{ fontSize: 12, color: "#8B8B8F", fontWeight: 700, marginBottom: 8 }}>{t.regionLabel}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {REGIONS.map((r) => (
              <button key={r} onClick={() => setRegion(r)} style={brandChipStyle(region === r)}>
                {REGION_LABEL[lang][r]}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, color: "#8B8B8F", fontWeight: 700, marginBottom: 8 }}>{t.categoryLabel}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} style={brandChipStyle(category === cat)}>
                {CATEGORY_LABEL[lang][cat]}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#8B8B8F", marginBottom: 16 }}>
            <span>{t.legend}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "#E3E1DA" }} />{t.legendClosed}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "#9FCBB8" }} />{t.legendSome}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "#1F5C4F" }} />{t.legendMany}
            </span>
          </div>
        </div>
      )}

      {/* HOME LIST */}
      {tab === "home" && view === "list" && (
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 24px" }}>
          {(() => {
            const intlCenters = CENTERS.filter((c) => c.englishSupport);
            if (intlCenters.length === 0) return null;
            return (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 2 }}>{t.intlSectionTitle}</div>
                <div style={{ fontSize: 12, color: "#8B8B8F", marginBottom: 10 }}>{t.intlSectionSub}</div>
                <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                  {intlCenters.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => openDetail(c)}
                      style={{
                        flexShrink: 0,
                        width: 168,
                        borderRadius: 14,
                        border: "1px solid #F0F0F1",
                        overflow: "hidden",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <PhotoCard tags={c.tags} height={80} />
                        {c.isPartner && (
                          <div style={{ position: "absolute", top: 6, left: 6, background: "#1F5C4F", color: "#fff", fontSize: 9, fontWeight: 800, padding: "3px 6px", borderRadius: 6 }}>
                            {t.partnerBadge}
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "10px 10px 12px" }}>
                        <div style={{ fontWeight: 800, fontSize: 12.5, lineHeight: 1.3, marginBottom: 4 }}>
                          {lang === "en" && c.nameEn ? c.nameEn : c.name}
                        </div>
                        <div style={{ fontSize: 10.5, color: "#8B8B8F" }}>{REGION_LABEL[lang][c.region]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => openDetail(c)}
                style={{
                  borderRadius: 16,
                  border: c.isPartner ? "1.5px solid #1F5C4F" : "1px solid #F0F0F1",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ position: "relative" }}>
                  <PhotoCard tags={c.tags} />
                  <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
                    <Badge centerId={c.id} />
                    {c.isPartner && (
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: "#1F5C4F", padding: "4px 8px", borderRadius: 6 }}>
                        {t.partnerBadge}
                      </span>
                    )}
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 6 }}>
                    {REGION_LABEL[lang][c.region]}
                  </div>
                </div>
                <div style={{ padding: "14px 14px 16px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                    {c.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: "#4A6FA5", background: "#EEF2F8", padding: "2px 8px", borderRadius: 999 }}>
                        {CATEGORY_LABEL[lang][tag] || tag}
                      </span>
                    ))}
                    {c.englishSupport && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#1F5C4F", background: "#E9F3EF", padding: "2px 8px", borderRadius: 999 }}>
                        {t.englishSupport}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{lang === "en" && c.nameEn ? c.nameEn : c.name}</div>
                  <div style={{ fontSize: 12, color: "#8B8B8F", margin: "3px 0 6px" }}>
                    {c.area} · {c.duration}
                  </div>
                  <div style={{ fontSize: 13, color: "#1A1A1A", fontWeight: 600, marginBottom: 8 }}>
                    <span style={{ color: "#FF4B3E" }}>✓</span> {lang === "en" && c.highlightEn ? c.highlightEn : c.highlight}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {seedAvailability(c.id).map((v, i) => (
                        <span key={i} style={{ width: 6, height: 6, borderRadius: 2, background: v === 0 ? "#EEEEEE" : v === 1 ? "#FFC9C4" : "#12B76A" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#8B8B8F" }}>
                {lang === "en" ? "No centers match your filters." : "조건에 맞는 검진센터가 없습니다."}
              </div>
            )}
          </div>
        </main>
      )}

      {/* DETAIL */}
      {tab === "home" && view === "detail" && selectedCenter && (
        <main style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 160 }}>
          <div style={{ position: "relative" }}>
            <PhotoCard tags={selectedCenter.tags} height={200} />
            <button
              onClick={() => setView("list")}
              style={{ position: "absolute", top: 14, left: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", fontSize: 16 }}
            >
              ←
            </button>
            <div style={{ position: "absolute", bottom: 12, left: 14 }}>
              <Badge centerId={selectedCenter.id} />
            </div>
          </div>

          <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#8B8B8F", background: "#F7F7F8", padding: "3px 8px", borderRadius: 999 }}>{REGION_LABEL[lang][selectedCenter.region]}</span>
              {selectedCenter.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: "#4A6FA5", background: "#EEF2F8", padding: "3px 8px", borderRadius: 999 }}>
                  {CATEGORY_LABEL[lang][tag] || tag}
                </span>
              ))}
              {selectedCenter.englishSupport && (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1F5C4F", background: "#E9F3EF", padding: "3px 8px", borderRadius: 999 }}>
                  {t.englishSupport}
                </span>
              )}
              {selectedCenter.isPartner && (
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: "#1F5C4F", padding: "3px 8px", borderRadius: 999 }}>
                  {t.partnerBadge}
                </span>
              )}
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 21, margin: "0 0 4px" }}>{lang === "en" && selectedCenter.nameEn ? selectedCenter.nameEn : selectedCenter.name}</h2>
            <div style={{ color: "#8B8B8F", fontSize: 13, marginBottom: 14 }}>
              {selectedCenter.area} · {selectedCenter.duration}
            </div>

            <div style={{ background: "#FFF8F7", border: "1px solid #FFE4E1", borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13, fontWeight: 700, color: "#B5342A" }}>
              ✓ {lang === "en" && selectedCenter.highlightEn ? selectedCenter.highlightEn : selectedCenter.highlight}
            </div>

            {selectedCenter.isPartner && selectedCenter.coordinatorNote && (
              <div style={{ background: "#F1F8F5", border: "1px solid #C9E4D8", borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#1F5C4F", marginBottom: 4 }}>🤝 {t.coordinatorTitle}</div>
                <div style={{ fontSize: 12.5, color: "#1F5C4F", lineHeight: 1.5 }}>
                  {lang === "en" && selectedCenter.coordinatorNoteEn ? selectedCenter.coordinatorNoteEn : selectedCenter.coordinatorNote}
                </div>
              </div>
            )}

            {lang === "ko" ? (
              <a
                href={`https://pf.kakao.com/_xxXXxs/chat`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "1px solid #F7DA3B",
                  color: "#3A2929",
                  background: "#FFFBEA",
                  borderRadius: 12,
                  padding: "11px 0",
                  marginBottom: 16,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                🟡 {t.kakaoContact}
              </a>
            ) : (
              selectedCenter.englishSupport && (
                <a
                  href={`https://wa.me/821000000000?text=${encodeURIComponent(
                    "Hi, I have a question about " + (selectedCenter.nameEn || selectedCenter.name)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    border: "1px solid #25D366",
                    color: "#128C7E",
                    background: "#F0FAF6",
                    borderRadius: 12,
                    padding: "11px 0",
                    marginBottom: 16,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  🟢 {t.whatsappContact}
                </a>
              )
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F7F7F8", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "#8B8B8F" }}>{t.checkupCost}</div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>{selectedCenter.price.toLocaleString()}{lang === "en" ? " KRW" : "원"}</div>
                {lang === "en" && <div style={{ fontSize: 11, color: "#8B8B8F", marginTop: 2 }}>{t.approxUsd(approxUsd(selectedCenter.price))}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#8B8B8F" }}>{t.duration}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selectedCenter.duration}</div>
              </div>
            </div>

            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>{t.dateSelect}</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
              {days.map((d, i) => {
                const { md, wd } = formatDate(d);
                const density = seedAvailability(selectedCenter.id)[i];
                const disabled = density === 0;
                const active = selectedDayIdx === i;
                return (
                  <button
                    key={i}
                    disabled={disabled}
                    onClick={() => setSelectedDayIdx(i)}
                    style={{
                      flexShrink: 0,
                      width: 54,
                      padding: "9px 0",
                      borderRadius: 12,
                      border: "1px solid",
                      borderColor: active ? "#1A1A1A" : "#EEEEEE",
                      background: disabled ? "#F7F7F8" : active ? "#1A1A1A" : "#fff",
                      color: disabled ? "#C7C7C9" : active ? "#fff" : "#1A1A1A",
                      cursor: disabled ? "not-allowed" : "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 10 }}>{wd}</div>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{md}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>{t.timeSelect}</div>
            {bookingError && (
              <div style={{ background: "#FFEDEB", color: "#B5342A", fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 14 }}>{bookingError}</div>
            )}
            {slotsLoading ? (
              <div style={{ color: "#8B8B8F", fontSize: 13, padding: "20px 0" }}>{t.loadingSlots}</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
                {slots.map((s) => {
                  const active = selectedTime === s.time;
                  return (
                    <button
                      key={s.time}
                      disabled={!s.available}
                      onClick={() => setSelectedTime(s.time)}
                      style={{
                        padding: "10px 0",
                        borderRadius: 10,
                        border: "1px solid",
                        borderColor: active ? "#FF4B3E" : "#EEEEEE",
                        background: !s.available ? "#F7F7F8" : active ? "#FF4B3E" : "#fff",
                        color: !s.available ? "#C7C7C9" : active ? "#fff" : "#1A1A1A",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: s.available ? "pointer" : "not-allowed",
                        textDecoration: !s.available ? "line-through" : "none",
                      }}
                    >
                      {s.time}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* sticky bottom CTA */}
          <div style={{ position: "fixed", bottom: 60, left: 0, right: 0, background: "#fff", borderTop: "1px solid #F0F0F1", padding: 14, maxWidth: 480, margin: "0 auto", zIndex: 35, boxShadow: "0 -2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 480, margin: "0 auto" }}>
              <div>
                <div style={{ fontSize: 11, color: "#8B8B8F" }}>{t.checkupCost}</div>
                <div style={{ fontWeight: 900, fontSize: 17 }}>{selectedCenter.price.toLocaleString()}{lang === "en" ? " KRW" : "원"}</div>
              </div>
              <button
                onClick={goBookConfirm}
                disabled={!selectedTime}
                style={{
                  padding: "14px 28px",
                  borderRadius: 12,
                  border: "none",
                  background: selectedTime ? "#FF4B3E" : "#EEEEEE",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: selectedTime ? "pointer" : "not-allowed",
                }}
              >
                {selectedTime ? t.bookAt(selectedTime) : t.selectTime}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* CONFIRM */}
      {tab === "home" && view === "confirm" && selectedCenter && !confirmedBooking && (
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 40px" }}>
          <button onClick={() => setView("detail")} style={{ border: "none", background: "none", color: "#8B8B8F", fontSize: 13, cursor: "pointer", marginBottom: 16, padding: 0 }}>
            {t.back}
          </button>
          <h2 style={{ fontWeight: 900, fontSize: 20, margin: "0 0 18px" }}>{t.confirmTitle}</h2>

          {bookingError && (
            <div style={{ background: "#FFEDEB", color: "#B5342A", fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 14 }}>{bookingError}</div>
          )}

          <div style={{ background: "#F7F7F8", borderRadius: 14, padding: 16, marginBottom: 18, fontSize: 14, lineHeight: 1.8 }}>
            <div style={{ fontWeight: 800 }}>{lang === "en" && selectedCenter.nameEn ? selectedCenter.nameEn : selectedCenter.name}</div>
            <div style={{ color: "#8B8B8F" }}>{selectedCenter.area}</div>
            <div style={{ marginTop: 6 }}>
              {formatDate(days[selectedDayIdx]).md} ({formatDate(days[selectedDayIdx]).wd}) · {selectedTime}
            </div>
            <div style={{ fontWeight: 800, marginTop: 4 }}>{selectedCenter.price.toLocaleString()}{lang === "en" ? " KRW" : "원"}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.nameLabel} style={inputStyle} />
            <input
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                if (phoneVerified) { setPhoneVerified(false); setOtpSent(false); setGeneratedOtp(null); }
              }}
              placeholder={t.phoneLabel}
              style={inputStyle}
            />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, marginBottom: form.isForeign ? 10 : 20, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={form.isForeign}
              onChange={(e) => { setForm({ ...form, isForeign: e.target.checked }); setPaymentMethod("card"); }}
            />
            {t.foreignToggle}
          </label>

          {form.isForeign && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
              <input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} placeholder={t.nationalityLabel} style={inputStyle} />
              <input value={form.passport} onChange={(e) => setForm({ ...form, passport: e.target.value })} placeholder={t.passportLabel} style={inputStyle} />
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <input type="checkbox" checked={form.airportPickup} onChange={(e) => setForm({ ...form, airportPickup: e.target.checked })} />
                {t.airportPickup}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <input type="checkbox" checked={form.interpreter} onChange={(e) => setForm({ ...form, interpreter: e.target.checked })} />
                {t.interpreterService}
              </label>
              <div style={{ fontSize: 12, color: "#1F5C4F", background: "#E9F3EF", borderRadius: 10, padding: "10px 12px" }}>
                ℹ️ {t.visaNote}
              </div>
            </div>
          )}

          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{t.idUploadLabel}</div>
          <div
            style={{
              border: "1px solid",
              borderColor: phoneVerified ? "#9FCBB8" : "#EEEEEE",
              background: phoneVerified ? "#F1F8F5" : "#fff",
              borderRadius: 12,
              padding: 14,
              marginBottom: 20,
            }}
          >
            {!phoneVerified && (
              <button
                onClick={handleSendOtp}
                disabled={!form.phone.trim()}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 10,
                  border: "1px solid #1A1A1A",
                  background: "#fff",
                  color: form.phone.trim() ? "#1A1A1A" : "#C7C7C9",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: form.phone.trim() ? "pointer" : "not-allowed",
                  marginBottom: otpSent ? 12 : 0,
                }}
              >
                {otpSent ? t.resendCode : t.sendCode}
              </button>
            )}

            {otpSent && !phoneVerified && (
              <>
                <div style={{ fontSize: 12, color: "#1F5C4F", background: "#E9F3EF", borderRadius: 8, padding: "8px 10px", marginBottom: 10 }}>
                  ℹ️ {t.codeSentNote(generatedOtp)}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder={t.codeLabel}
                    maxLength={6}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otpInput.length !== 6}
                    style={{
                      padding: "0 18px",
                      borderRadius: 10,
                      border: "none",
                      background: otpInput.length === 6 ? "#FF4B3E" : "#EEEEEE",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: otpInput.length === 6 ? "pointer" : "not-allowed",
                    }}
                  >
                    {t.verifyCode}
                  </button>
                </div>
                {otpError && <div style={{ color: "#B5342A", fontSize: 12, marginTop: 8 }}>{otpError}</div>}
              </>
            )}

            {phoneVerified && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#1F5C4F", fontWeight: 700, fontSize: 14 }}>
                <span>✓</span> {t.verified} ({form.phone})
              </div>
            )}
          </div>

          <button
            onClick={goToPayment}
            disabled={!form.name.trim() || !form.phone.trim() || !phoneVerified || (form.isForeign && (!form.nationality.trim() || !form.passport.trim()))}
            style={{
              width: "100%",
              padding: "15px 0",
              borderRadius: 12,
              border: "none",
              background:
                form.name.trim() && form.phone.trim() && phoneVerified && !(form.isForeign && (!form.nationality.trim() || !form.passport.trim()))
                  ? "#FF4B3E"
                  : "#EEEEEE",
              color: "#fff",
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {t.nextToPayment}
          </button>
        </main>
      )}

      {/* PAYMENT */}
      {tab === "home" && view === "payment" && selectedCenter && !confirmedBooking && (
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 40px" }}>
          <button onClick={() => setView("confirm")} style={{ border: "none", background: "none", color: "#8B8B8F", fontSize: 13, cursor: "pointer", marginBottom: 16, padding: 0 }}>
            {t.back}
          </button>
          <h2 style={{ fontWeight: 900, fontSize: 20, margin: "0 0 18px" }}>{t.paymentTitle}</h2>

          {bookingError && (
            <div style={{ background: "#FFEDEB", color: "#B5342A", fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 14 }}>{bookingError}</div>
          )}

          <div style={{ background: "#F7F7F8", borderRadius: 14, padding: 16, marginBottom: 18, fontSize: 14, lineHeight: 1.8 }}>
            <div style={{ fontWeight: 800 }}>{lang === "en" && selectedCenter.nameEn ? selectedCenter.nameEn : selectedCenter.name}</div>
            <div style={{ marginTop: 4 }}>
              {formatDate(days[selectedDayIdx]).md} ({formatDate(days[selectedDayIdx]).wd}) · {selectedTime}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: "#8B8B8F" }}>{t.depositLabel}</span>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{calcDeposit(selectedCenter.price).toLocaleString()}{lang === "en" ? " KRW" : "원"}</span>
          </div>
          {lang === "en" && (
            <div style={{ fontSize: 11, color: "#8B8B8F", marginBottom: 4 }}>{t.approxUsd(approxUsd(calcDeposit(selectedCenter.price)))}</div>
          )}
          <div style={{ fontSize: 12, color: "#8B8B8F", marginBottom: 20 }}>{t.remainingLabel}</div>

          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{t.paymentMethod}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: form.isForeign ? 6 : 24 }}>
            {(form.isForeign
              ? [
                  { key: "card", label: t.payCard, icon: "💳" },
                  { key: "paypal", label: t.payPaypal, icon: "🌐" },
                ]
              : [
                  { key: "card", label: t.payCard, icon: "💳" },
                  { key: "kakao", label: t.payKakao, icon: "🟡" },
                  { key: "naver", label: t.payNaver, icon: "🟢" },
                ]
            ).map((m) => (
              <label
                key={m.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid",
                  borderColor: paymentMethod === m.key ? "#FF4B3E" : "#EEEEEE",
                  background: paymentMethod === m.key ? "#FFF8F7" : "#fff",
                  borderRadius: 12,
                  padding: "12px 14px",
                  cursor: "pointer",
                }}
              >
                <input type="radio" name="paymentMethod" checked={paymentMethod === m.key} onChange={() => setPaymentMethod(m.key)} />
                <span>{m.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{m.label}</span>
              </label>
            ))}
          </div>
          {form.isForeign && <div style={{ fontSize: 11, color: "#8B8B8F", marginBottom: 24 }}>ℹ️ {t.intlPaymentNote}</div>}

          <button
            onClick={payAndConfirm}
            disabled={paying || submitting}
            style={{
              width: "100%",
              padding: "15px 0",
              borderRadius: 12,
              border: "none",
              background: paying || submitting ? "#EEEEEE" : "#FF4B3E",
              color: "#fff",
              fontSize: 15,
              fontWeight: 800,
              cursor: paying || submitting ? "not-allowed" : "pointer",
            }}
          >
            {paying ? t.paying : submitting ? t.submitting : t.payButton(`${calcDeposit(selectedCenter.price).toLocaleString()}${lang === "en" ? " KRW" : "원"}`)}
          </button>
        </main>
      )}

      {confirmedBooking && (
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "60px 20px 60px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#12B76A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 20px" }}>✓</div>
          <h2 style={{ fontWeight: 900, fontSize: 20, margin: "0 0 8px" }}>{t.confirmedTitle}</h2>
          <p style={{ color: "#8B8B8F", fontSize: 14, marginBottom: 8 }}>{t.confirmedSub(confirmedBooking.phone)}</p>
          <p style={{ color: "#1F5C4F", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            {t.depositPaidNote(`${confirmedBooking.deposit.toLocaleString()}${lang === "en" ? " KRW" : "원"}`)}
          </p>
          <div style={{ background: "#F7F7F8", borderRadius: 14, padding: 18, textAlign: "left", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
            <div style={{ fontWeight: 800 }}>{confirmedBooking.centerName}</div>
            <div style={{ color: "#8B8B8F" }}>{confirmedBooking.area}</div>
            <div style={{ marginTop: 6 }}>
              {confirmedBooking.dateLabel} · {confirmedBooking.time}
            </div>
            <div>{t.reservedBy} · {confirmedBooking.name}</div>
            {confirmedBooking.isForeign && confirmedBooking.nationality && (
              <div style={{ color: "#8B8B8F" }}>{t.nationalityLabel}: {confirmedBooking.nationality}{confirmedBooking.passport ? ` · ${t.passportLabel}: ${confirmedBooking.passport}` : ""}</div>
            )}
            {confirmedBooking.isForeign && (confirmedBooking.airportPickup || confirmedBooking.interpreter) && (
              <div style={{ color: "#8B8B8F" }}>
                {[confirmedBooking.airportPickup ? t.airportPickup : null, confirmedBooking.interpreter ? t.interpreterService : null].filter(Boolean).join(" · ")}
              </div>
            )}
            <div style={{ color: "#1F5C4F", fontWeight: 700, marginTop: 6 }}>✓ {t.verified}</div>
          </div>
          <button onClick={resetAll} style={{ padding: "13px 24px", borderRadius: 12, border: "1px solid #1F5C4F", background: "#fff", color: "#1F5C4F", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
            {t.browseMore}
          </button>
        </main>
      )}

      {/* BOOKINGS TAB */}
      {tab === "bookings" && (
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "16px 16px 40px" }}>
          <div style={{ fontSize: 18, fontWeight: 800, margin: "4px 0 14px" }}>{t.bookingsTitle}</div>
          {myBookingsLoading ? (
            <div style={{ color: "#8B8B8F", fontSize: 13 }}>{t.bookingsLoading}</div>
          ) : myBookings.length === 0 ? (
            <div style={{ color: "#8B8B8F", fontSize: 14, textAlign: "center", padding: "60px 0" }}>{t.bookingsEmpty}</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[...myBookings].reverse().map((b) => (
                <div key={b.id} style={{ border: "1px solid #F0F0F1", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: 64, flexShrink: 0 }}>
                      <PhotoCard tags={b.tags || ["종합검진"]} height={64} />
                    </div>
                    <div style={{ padding: "10px 12px", fontSize: 13, lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 800 }}>{b.centerName}</div>
                      <div style={{ color: "#8B8B8F", fontSize: 12 }}>{b.area}</div>
                      <div>{b.dateLabel} · {b.time} · {b.price.toLocaleString()}{lang === "en" ? " KRW" : "원"}</div>
                      {b.deposit && (
                        <div style={{ color: "#1F5C4F", fontSize: 12, fontWeight: 700 }}>
                          {t.depositLabel}: {b.deposit.toLocaleString()}{lang === "en" ? " KRW" : "원"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* MY TAB */}
      {tab === "my" && (
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px", textAlign: "center", color: "#8B8B8F" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🙂</div>
          <div style={{ fontSize: 14 }}>{t.myTabPlaceholder}</div>
        </main>
      )}

      {/* Bottom tab bar */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #F0F0F1", display: "flex", zIndex: 30 }}>
        {[
          { key: "home", label: t.navHome, icon: "🏠", action: resetAll },
          { key: "bookings", label: t.navBookings, icon: "🗓", action: openMyBookings },
          { key: "my", label: t.navMy, icon: "👤", action: () => setTab("my") },
        ].map((nt) => (
          <button
            key={nt.key}
            onClick={nt.action}
            style={{
              flex: 1,
              border: "none",
              background: "none",
              padding: "10px 0 12px",
              cursor: "pointer",
              color: tab === nt.key ? "#1A1A1A" : "#B7B7B9",
              fontWeight: tab === nt.key ? 800 : 600,
            }}
          >
            <div style={{ fontSize: 18 }}>{nt.icon}</div>
            <div style={{ fontSize: 11, marginTop: 2 }}>{nt.label}</div>
          </button>
        ))}
      </nav>
    </div>
  );
}

const inputStyle = { padding: "12px 14px", borderRadius: 10, border: "1px solid #EEEEEE", fontSize: 14, outline: "none" };
function chipStyle(active) {
  return {
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid",
    borderColor: active ? "#1A1A1A" : "#EEEEEE",
    background: active ? "#1A1A1A" : "#fff",
    color: active ? "#fff" : "#1A1A1A",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
  };
}
function brandChipStyle(active) {
  return {
    padding: "7px 14px",
    borderRadius: 999,
    border: "1px solid",
    borderColor: active ? "#1F5C4F" : "#D9D7CE",
    background: active ? "#1F5C4F" : "#fff",
    color: active ? "#fff" : "#16211D",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  };
}
