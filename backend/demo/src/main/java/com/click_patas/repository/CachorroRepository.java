package com.click_patas.repository;

import com.click_patas.model.Cachorro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CachorroRepository extends JpaRepository<Cachorro, Long> {
}