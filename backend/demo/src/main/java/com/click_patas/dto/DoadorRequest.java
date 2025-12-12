package com.click_patas.dto;

import java.math.BigDecimal;

public record DoadorRequest(Long pessoaId, String cpfCnpj, BigDecimal totalDoado) {
}
