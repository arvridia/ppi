package com.click_patas.model;

import java.time.LocalDate;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "pessoaId")
public class Cliente implements Persistable<Long> {

    @Id 
    @Column(name = "pessoa_id")
    private Long pessoaId;

    @OneToOne(fetch = FetchType.LAZY) 
    @MapsId 
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @Transient
    @JsonIgnore
    private boolean newEntity = true;

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        if (pessoa != null) {
            this.pessoaId = pessoa.getId();
        }
    }

    @JsonIgnore
    @Override
    public boolean isNew() {
        return this.newEntity;
    }

    @Override
    public Long getId() {
        return pessoaId;
    }

    @SuppressWarnings("unused")
    @PostLoad
    @PostPersist
    private void markNotNew() {
        this.newEntity = false;
    }

}