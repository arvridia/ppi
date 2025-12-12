package com.click_patas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "cachorro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cachorro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    private String raca;

    @Column(name = "status_adocao", nullable = false, length = 50)
    private String statusAdocao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doador_id", nullable = false, 
                referencedColumnName = "pessoa_id",
                foreignKey = @ForeignKey(name = "FK_CACHORRO_DOADOR"))
    private Doador doador; 
}