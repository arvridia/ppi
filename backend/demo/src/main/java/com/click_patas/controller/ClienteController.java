package com.click_patas.controller;

import java.time.LocalDate;
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

import com.click_patas.dto.ClienteRequest;
import com.click_patas.model.Cliente;
import com.click_patas.model.Pessoa;
import com.click_patas.repository.ClienteRepository;
import com.click_patas.repository.PessoaRepository;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:8080")
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private PessoaRepository pessoaRepository;

	@GetMapping
	public List<Cliente> listarTodos() {
		return clienteRepository.findAll();
	}

	@GetMapping("/{id}")
	public Cliente buscarPorId(@PathVariable Long id) {
		return clienteRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
	}

	@PostMapping
	public Cliente adicionar(@RequestBody ClienteRequest payload) {
		Pessoa pessoa = localizarPessoa(payload.pessoaId());
		Cliente cliente = new Cliente();
		cliente.setPessoaId(pessoa.getId());
		cliente.setPessoa(pessoa);
		cliente.setDataCadastro(
			payload.dataCadastro() != null ? payload.dataCadastro() : LocalDate.now());
		return clienteRepository.save(cliente);
	}

	@PutMapping("/{id}")
	public Cliente atualizar(@PathVariable Long id, @RequestBody ClienteRequest payload) {
		Cliente existente = clienteRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

		Long pessoaId = payload.pessoaId();
		if (pessoaId != null && !pessoaId.equals(existente.getPessoaId())) {
			Pessoa pessoa = pessoaRepository.findById(pessoaId)
				.orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
			existente.setPessoaId(pessoa.getId());
			existente.setPessoa(pessoa);
		}
		existente.setDataCadastro(
			payload.dataCadastro() != null ? payload.dataCadastro() : existente.getDataCadastro());
		return clienteRepository.save(existente);
	}

	private Pessoa localizarPessoa(Long pessoaId) {
		if (pessoaId == null) {
			throw new RuntimeException("Informe pessoaId");
		}
		return pessoaRepository.findById(pessoaId)
			.orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
	}

	@DeleteMapping("/{id}")
	public void remover(@PathVariable Long id) {
		clienteRepository.deleteById(id);
	}
}
