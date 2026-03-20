export type CaseStudy = {
  eyebrow: string;
  eyebrowClassName: string;
  iconClassName: string;
  dialogBorderClassName: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  detailPoints: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    eyebrow: "FOX CASH",
    eyebrowClassName: "border-lime-300 text-lime-500",
    iconClassName: "text-lime-500",
    dialogBorderClassName: "border-lime-300",
    title: "Gói linh hoạt, cá nhân hóa tối đa",
    description:
      "Cash Voucher là giải pháp quà tặng đơn giản và linh hoạt nhất dành cho doanh nghiệp muốn tri ân nhân viên",
    image: "/Fox Swat/fx3.webp",
    tags: [
      "Cá nhân hóa 100%",
      "Không giới hạn loại dịch vụ",
      "Dễ dàng sử dụng",
    ],
    detailPoints: [
      "Mệnh giá đa dạng: 50.000 VNĐ – 100.000 VNĐ – 200.000 VNĐ – 500.000 VNĐ (có thể tùy chỉnh theo nhu cầu doanh nghiệp).",
      "Cách sử dụng: Nhân viên nhận voucher như một khoản tiền mặt kỹ thuật số hoặc vật lý, mang đến bất kỳ cửa hàng Face Wash Fox nào trên toàn quốc để trừ trực tiếp vào chi phí dịch vụ chăm sóc da",
    ],
  },
  {
    eyebrow: "FOX GIFT CARD",
    eyebrowClassName: "border-sky-300 text-sky-500",
    iconClassName: "text-sky-500",
    dialogBorderClassName: "border-sky-300",
    title: "Gói liệu trình chuyên gia",
    description:
      "<strong>Card Voucher là gói quà tặng cao cấp</strong> với mệnh giá cố định, tương ứng trực tiếp một liệu trình trọn gói tại Face Wash Fox, mang đến trải nghiệm chuyên sâu ngay lập tức.",
    image: "/Fox Swat/combo2 02-03.png",
    tags: [
      "Trải nghiệm chăm sóc da chuẩn chuyên gia",
      "Tạo cảm giác được chăm sóc thực sự",
      "Dễ dàng sử dụng",
    ],
    detailPoints: [
      "Doanh nghiệp chọn sẵn các liệu trình khuyên dùng từ nhà Cáo để làm quà tặng chăm sóc cho nhân viên",
      "Nhân viên mang card đến bất kỳ cửa hàng nào trong hệ thống để sử dụng đầy đủ quy trình: soi da, tư vấn và thực hiện liệu trình chuyên nghiệp.",
    ],
  },
  {
    eyebrow: "FOX SWAT",
    eyebrowClassName: "border-orange-300 text-orange-500",
    iconClassName: "text-orange-500",
    dialogBorderClassName: "border-orange-300",
    title: "Gói chăm sóc ngay tại văn phòng",
    description:
      "Fox SWAT mang toàn bộ spa công nghệ cao của Face Wash Fox đến ngay tại doanh nghiệp, setup booth chuyên nghiệp để nhân viên thư giãn và chăm sóc da mà không cần di chuyển",
    image: "/Fox Swat/fx3-office.webp",
    tags: [
      "Tạo điểm nhấn cho văn hóa doanh nghiệp",
      "Trải nghiệm thư giãn ngay trong giờ làm việc",
    ],
    detailPoints: [
      "Đội ngũ chuyên gia cùng thiết bị hiện đại (máy soi da AI, các đầu máy rửa mặt) đến tận văn phòng.",
      "Phù hợp cho Brand Day, sự kiện nội bộ, team building",
      "Linh hoạt chăm sóc ngắn hạn, biến một ngày làm việc thành ngày trải nghiệm đáng nhớ và gắn kết đội nhóm",
    ],
  },
];

export const faqItems = [
  {
    question: "Doanh nghiệp có thể triển khai dịch vụ cho bao nhiêu nhân viên?",
    answer:
      "Face Wash Fox có thể linh hoạt triển khai từ nhóm nhỏ khoảng 10-50 nhân viên đến các chương trình lớn cho 300-500 nhân viên trong cùng một ngày, tùy theo gói dịch vụ và không gian tại doanh nghiệp.",
  },
  {
    question:
      "Dịch vụ chăm sóc da tại văn phòng có ảnh hưởng đến giờ làm việc không?",
    answer:
      "Các liệu trình được thiết kế gọn và tối ưu thời gian. Mỗi lượt trải nghiệm thường chỉ khoảng 10-15 phút, giúp nhân viên thư giãn và chăm sóc da mà vẫn không ảnh hưởng đến tiến độ công việc.",
  },
  {
    question:
      "Doanh nghiệp cần chuẩn bị gì khi triển khai Fox SWAT tại văn phòng?",
    answer:
      "Doanh nghiệp chỉ cần bố trí một khu vực phù hợp để setup booth trải nghiệm. Face Wash Fox sẽ chuẩn bị thiết bị, sản phẩm, quy trình vận hành và đội ngũ chuyên viên đi kèm.",
  },
  {
    question:
      "Voucher hoặc gift card có thể sử dụng linh hoạt theo thời gian của nhân viên không?",
    answer:
      "Có. Nhân viên có thể chủ động sắp xếp thời gian sử dụng voucher hoặc gift card tại hệ thống Face Wash Fox, giúp doanh nghiệp dễ triển khai mà không cần gom lịch cố định cho toàn bộ đội ngũ.",
  },
  {
    question: "Doanh nghiệp có thể tùy chỉnh gói dịch vụ theo ngân sách không?",
    answer:
      "Có. Face Wash Fox có thể thiết kế gói chăm sóc phù hợp với ngân sách, mục tiêu và quy mô từng doanh nghiệp, từ voucher linh hoạt, gift card cố định đến trải nghiệm chăm sóc ngay tại văn phòng.",
  },
];
