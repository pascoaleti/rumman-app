package br.app.rumman.sample

/**
 * Public architecture sample. Production implementation remains private.
 *
 * The rule is deterministic and local: reserved stock is never presented as
 * available stock, even when the physical balance is positive.
 */
data class StockSnapshot(
    val physical: Int,
    val reserved: Int,
    val minimum: Int,
) {
    init {
        require(physical >= 0) { "Physical stock cannot be negative" }
        require(reserved >= 0) { "Reserved stock cannot be negative" }
        require(minimum >= 0) { "Minimum stock cannot be negative" }
    }

    val available: Int
        get() = physical - reserved

    val status: StockStatus
        get() = when {
            available < 0 -> StockStatus.CRITICAL
            available <= minimum -> StockStatus.REPLENISH
            else -> StockStatus.HEALTHY
        }
}

enum class StockStatus {
    CRITICAL,
    REPLENISH,
    HEALTHY,
}
