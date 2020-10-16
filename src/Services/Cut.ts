// 查找最优优惠券

// 优惠券数组  价格数组
// 优惠券 按优惠金额排列
// 价格数组随机
// 依次从一件商品到最多件
type CutType = "classtime" | "price" | "lessonLen" | "free";

export interface CutObject {
  id?: number;
  /** 门槛 */
  threshold?: number;
  /** 优惠数值 */
  price?: number;
  /** 优惠类型 classtime 满课时减，price 满金额减，lessonLen 满几科减，free 无门槛 */
  type: CutType;
}
