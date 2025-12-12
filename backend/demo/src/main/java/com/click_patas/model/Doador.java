package com.click_patas.model;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "doador")
@Data
@NoArgsConstructor
@EqualsAndHashCode(of = "pessoaId")
public class Doador implements Persistable<Long> {

    @Id
    @Column(name = "pessoa_id")
    private Long pessoaId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    @Column(name = "cpf_cnpj", unique = true, length = 30)
    private String cpfCnpj;

    @Column(name = "total_doado", precision = 10, scale = 2)
    private BigDecimal totalDoado = BigDecimal.ZERO;

    @OneToMany(mappedBy = "doador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Cachorro> cachorros;

    @Transient
    @JsonIgnore
    private boolean newEntity = true;


    public void setPessoaId(Long pessoaId) {
        this.pessoaId = pessoaId;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        if (pessoa != null) {
            this.pessoaId = pessoa.getId();
        }
    }

    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }

    public void setTotalDoado(BigDecimal totalDoado) {
        this.totalDoado = totalDoado;
    }

    public void setCachorros(List<Cachorro> cachorros) {
        this.cachorros = cachorros;
    }

    @Override
    public Long getId() {
        return pessoaId;
    }

    @JsonIgnore
    @Override
    public boolean isNew() {
        return this.newEntity;
    }

    @SuppressWarnings("unused")
    @PostLoad
    @PostPersist
    private void markNotNew() {
        this.newEntity = false;
    }

}