// A-메추 (AI 메뉴 추천) 서비스 타입 정의
// ERD 기반 데이터 모델

export interface Store {
  business_num: string; // PK
  store_name: string;
  tel: string;
  delivery_type: string;
  address: string;
  min_pay: number;
}

export interface Menu {
  menu_id: number; // PK
  business_num: string; // FK -> Store
  menu_name: string;
  menu_info: string;
  menu_img: string;
  category: MenuCategory;
  price: number;
}

export interface User {
  user_id: number; // PK
  nickname: string;
  tel: string;
  email: string;
  address: string;
  user_grade: string;
  signup_date: Date;
  point: number;
}

export interface Order {
  order_id: number; // PK
  user_id: number; // FK -> User
  business_num: string; // FK -> Store
  order_status: string;
  pay_opt: string;
  delivery_req: string;
  order_time: Date;
  paid_amount: number;
}

export interface OrderMenu {
  ordermenu_id: number; // PK
  order_id: number; // FK -> Order
  menu_id: number; // FK -> Menu
  quantity: number;
}

export interface Review {
  review_id: number; // PK
  user_id: number; // FK -> User
  order_id: number; // FK -> Order (1:1 관계)
  review_txt: string;
  created_at: Date;
  rating: number; // 1-5
}

// 피드백 저장용 (ERD 외 확장)
export interface Feedback {
  feedback_id: number;
  user_id: number;
  recommended_menu_ids: number[];
  chosen_menu_id: number | null;
  time_segment: TimeSegment;
  rating: number;
  comment: string;
  created_at: Date;
}

// 카테고리 타입
export type MenuCategory =
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "분식"
  | "치킨"
  | "피자"
  | "버거"
  | "샐러드"
  | "카페/디저트";

export const MENU_CATEGORIES: MenuCategory[] = [
  "한식",
  "중식",
  "일식",
  "양식",
  "분식",
  "치킨",
  "피자",
  "버거",
  "샐러드",
  "카페/디저트",
];

// 시간대 타입
export type TimeSegment = "아침" | "점심" | "저녁" | "야식";

export const TIME_SEGMENTS: TimeSegment[] = ["아침", "점심", "저녁", "야식"];

// 시간대별 추천 카테고리 Prior
export const TIME_SEGMENT_PRIORS: Record<TimeSegment, MenuCategory[]> = {
  아침: ["샐러드", "카페/디저트", "분식"],
  점심: ["한식", "중식", "분식"],
  저녁: ["치킨", "피자", "한식"],
  야식: ["치킨", "분식", "중식"],
};

// 추천 결과 타입
export interface RecommendedMenu {
  menu: Menu;
  store: Store;
  score: number;
  avgRating: number;
  reviewCount: number;
  reasons: string[];
}

// 추천 요청 타입
export interface RecommendRequest {
  user_id: number;
  time_segment: TimeSegment;
  recent_categories: MenuCategory[];
  preferred_categories: MenuCategory[];
}

// 추천 응답 타입
export interface RecommendResponse {
  top3: RecommendedMenu[];
  time_segment: TimeSegment;
  is_cold_start: boolean;
  message?: string;
}
