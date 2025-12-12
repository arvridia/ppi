package com.click_patas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.click_patas.dto.CachorroRequest;
import com.click_patas.model.Cachorro;
import com.click_patas.model.Doador;
import com.click_patas.repository.CachorroRepository;
import com.click_patas.repository.DoadorRepository;

@RestController 
@RequestMapping("/api/cachorros")
@CrossOrigin(origins = "http://localhost:8080")

public class CachorroController {

    @Autowired
    private CachorroRepository cachorroRepository;

    @Autowired
    private DoadorRepository doadorRepository;

    @GetMapping 
    public List<Cachorro> listarTodos() {
        return cachorroRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cachorro buscarPorId(@PathVariable Long id) {
        return cachorroRepository.findById(id).orElseThrow(() -> new RuntimeException("Cachorro não encontrado"));
    }
    
    @PostMapping
    public Cachorro adicionar(@RequestBody CachorroRequest payload) {
        Cachorro cachorro = new Cachorro();
        cachorro.setNome(payload.nome());
        cachorro.setRaca(payload.raca());
        cachorro.setStatusAdocao(payload.statusAdocao());
        cachorro.setDoador(localizarDoador(payload.doadorId()));
        return cachorroRepository.save(cachorro);
    }

    @PutMapping("/{id}")
    public Cachorro atualizar(@PathVariable Long id, @RequestBody CachorroRequest payload) {
        Cachorro existente = cachorroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cachorro não encontrado"));

        existente.setNome(payload.nome());
        existente.setRaca(payload.raca());
        existente.setStatusAdocao(payload.statusAdocao());
        existente.setDoador(localizarDoador(payload.doadorId()));
        return cachorroRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        cachorroRepository.deleteById(id);
    }

    private Doador localizarDoador(Long doadorId) {
        if (doadorId == null) {
            throw new RuntimeException("Informe o ID do doador");
        }
        return doadorRepository.findById(doadorId)
            .orElseThrow(() -> new RuntimeException("Doador não encontrado"));
    }
}