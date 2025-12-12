package com.click_patas.dto;

import java.time.LocalDate;

public record ClienteRequest(Long pessoaId, LocalDate dataCadastro) {
}
