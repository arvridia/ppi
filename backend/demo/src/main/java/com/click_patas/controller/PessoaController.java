package com.click_patas.controller;

import com.click_patas.model.Pessoa;
import com.click_patas.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = "http://localhost:8080")
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaRepository;

	@GetMapping
	public List<Pessoa> listarTodos() {
		return pessoaRepository.findAll();
	}

	@GetMapping("/{id}")
	public Pessoa buscarPorId(@PathVariable Long id) {
		return pessoaRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
	}

	@PostMapping
	public Pessoa adicionar(@RequestBody Pessoa novaPessoa) {
		return pessoaRepository.save(novaPessoa);
	}

	@PutMapping("/{id}")
	public Pessoa atualizar(@PathVariable Long id, @RequestBody Pessoa pessoaAtualizada) {
		pessoaAtualizada.setId(id);
		return pessoaRepository.save(pessoaAtualizada);
	}

	@DeleteMapping("/{id}")
	public void remover(@PathVariable Long id) {
		pessoaRepository.deleteById(id);
	}
}
