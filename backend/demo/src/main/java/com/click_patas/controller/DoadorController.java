package com.click_patas.controller;

import java.math.BigDecimal;
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

import com.click_patas.dto.DoadorRequest;
import com.click_patas.model.Doador;
import com.click_patas.model.Pessoa;
import com.click_patas.repository.DoadorRepository;
import com.click_patas.repository.PessoaRepository;

@RestController
@RequestMapping("/api/doadores")
@CrossOrigin(origins = "http://localhost:8080")
public class DoadorController {

	@Autowired
	private DoadorRepository doadorRepository;

	@Autowired
	private PessoaRepository pessoaRepository;

	@GetMapping
	public List<Doador> listarTodos() {
		return doadorRepository.findAll();
	}

	@GetMapping("/{id}")
	public Doador buscarPorId(@PathVariable Long id) {
		return doadorRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Doador não encontrado"));
	}

	@PostMapping
	public Doador adicionar(@RequestBody DoadorRequest payload) {
		Pessoa pessoa = localizarPessoa(payload.pessoaId());
		Doador doador = new Doador();
		doador.setPessoaId(pessoa.getId());
		doador.setPessoa(pessoa);
		doador.setCpfCnpj(payload.cpfCnpj());
		doador.setTotalDoado(payload.totalDoado() != null ? payload.totalDoado() : BigDecimal.ZERO);
		return doadorRepository.save(doador);
	}

	@PutMapping("/{id}")
	public Doador atualizar(@PathVariable Long id, @RequestBody DoadorRequest payload) {
		Doador existente = doadorRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Doador não encontrado"));

		Long pessoaId = payload.pessoaId();
		if (pessoaId != null && !pessoaId.equals(existente.getPessoaId())) {
			Pessoa pessoa = pessoaRepository.findById(pessoaId)
				.orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
			existente.setPessoaId(pessoa.getId());
			existente.setPessoa(pessoa);
		}

		existente.setCpfCnpj(payload.cpfCnpj());
		existente.setTotalDoado(payload.totalDoado() != null ? payload.totalDoado() : existente.getTotalDoado());
		return doadorRepository.save(existente);
	}

	@DeleteMapping("/{id}")
	public void remover(@PathVariable Long id) {
		doadorRepository.deleteById(id);
	}

	private Pessoa localizarPessoa(Long pessoaId) {
		if (pessoaId == null) {
			throw new RuntimeException("Informe pessoaId");
		}
		return pessoaRepository.findById(pessoaId)
			.orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
	}

}
