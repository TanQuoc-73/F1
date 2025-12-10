package congngheweb.f1.formula1.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;

/**
 * Service để tính toán điểm số theo quy định F1
 */
@Service
public class PointsCalculationService {

    // Bảng điểm F1 theo vị trí
    private static final int[] POSITION_POINTS = {
            25, // P1
            18, // P2
            15, // P3
            12, // P4
            10, // P5
            8, // P6
            6, // P7
            4, // P8
            2, // P9
            1 // P10
    };

    private static final int FASTEST_LAP_BONUS = 1;
    private static final int TOP_10_THRESHOLD = 10;

    /**
     * Tính điểm dựa trên vị trí về đích
     * 
     * @param position Vị trí về đích (1-20)
     * @return Điểm số
     */
    public BigDecimal calculatePointsForPosition(int position) {
        if (position < 1) {
            throw new IllegalArgumentException("Position must be at least 1");
        }

        if (position <= POSITION_POINTS.length) {
            return BigDecimal.valueOf(POSITION_POINTS[position - 1]);
        }

        return BigDecimal.ZERO;
    }

    /**
     * Tính điểm fastest lap bonus
     * 
     * @param position      Vị trí về đích
     * @param hasFastestLap Có fastest lap không
     * @return Điểm bonus (1 nếu đủ điều kiện, 0 nếu không)
     */
    public BigDecimal calculateFastestLapBonus(int position, boolean hasFastestLap) {
        if (hasFastestLap && position <= TOP_10_THRESHOLD) {
            return BigDecimal.valueOf(FASTEST_LAP_BONUS);
        }
        return BigDecimal.ZERO;
    }

    /**
     * Tính tổng điểm (position points + fastest lap bonus)
     * 
     * @param position      Vị trí về đích
     * @param hasFastestLap Có fastest lap không
     * @return Tổng điểm
     */
    public BigDecimal calculateTotalPoints(int position, boolean hasFastestLap) {
        BigDecimal positionPoints = calculatePointsForPosition(position);
        BigDecimal fastestLapBonus = calculateFastestLapBonus(position, hasFastestLap);
        return positionPoints.add(fastestLapBonus);
    }

    /**
     * Validate position
     * 
     * @param position Vị trí cần validate
     * @return true nếu valid
     */
    public boolean isValidPosition(int position) {
        return position >= 1 && position <= 20;
    }
}
