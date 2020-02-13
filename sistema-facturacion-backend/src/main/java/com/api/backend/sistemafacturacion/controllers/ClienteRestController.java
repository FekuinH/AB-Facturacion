package com.api.backend.sistemafacturacion.controllers;

import java.io.IOException;
import java.net.MalformedURLException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.backend.sistemafacturacion.models.entity.Cliente;
import com.api.backend.sistemafacturacion.models.entity.Region;
import com.api.backend.sistemafacturacion.models.services.IClienteService;
import com.api.backend.sistemafacturacion.models.services.IUploadFileServices;

@CrossOrigin( origins = {"http://localhost:4200","*","https://ab-facturacion.firebaseapp.com"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {

	@Autowired
	private IUploadFileServices uploadService;
	@Autowired
	private IClienteService clienteService;

	@GetMapping("/clientes")
	public List<Cliente> getAll() {

		return clienteService.getAll();
	}

	@GetMapping("/clientes/page/{page}")
	public Page<Cliente> getAll(@PathVariable Integer page) {

		Pageable paginacion = PageRequest.of(page, 3);

		return clienteService.getAll(paginacion);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> mostrarCliente(@PathVariable Long id) {

		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?> finalResponse;

		try {
			if (clienteService.findById(id) != null) {
				cliente = clienteService.findById(id);
				finalResponse = new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
			} else {
				response.put("Mensaje",
						"El cliente ID:".concat(id.toString().concat(" no existe en la base de datos")));
				finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}

		} catch (DataAccessException e) {
			response.put("Mensaje", "Error al realizar la consulta en la base de datos");
			response.put("Error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			response.put("Mensaje", "Se provocó un error desconocido");
			response.put("Error", e.getMessage());
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return finalResponse;

	}

	@Secured("ROLE_ADMIN")
	@PostMapping("/clientes")
	public ResponseEntity<?> agregarCliente(@Valid @RequestBody Cliente cliente, BindingResult result) {
		Cliente clienteResponse;
		ResponseEntity<?> finalResponse;
		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = utils.SpringUtils.bindingResultToList(result);
			response.put("errors", errors);
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		} else {

			try {
				clienteResponse = clienteService.agregarCliente(cliente);

				response.put("mensaje", "El cliente ha sido creado con exito");
				response.put("cliente", clienteResponse);
				finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
			} catch (DataAccessException e) {
				response.put("mensaje", "ERROR AL CREAR EL CLIENTE");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return finalResponse;

	}

	@Secured("ROLE_ADMIN")
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> modificarCliente(@Valid @RequestBody Cliente cliente, BindingResult results,
			@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?> finalResponse;
		Cliente clienteActual;

		if (results.hasErrors()) {

			List<String> errors = utils.SpringUtils.bindingResultToList(results);
			response.put("errors", errors);
			return finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		clienteActual = clienteService.findById(id);

		if (clienteActual == null) {
			response.put("mensaje", "Error al modiicar el cliente con ID:"
					.concat(id.toString().concat(" no existe en la base de datos")));
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		} else {

			try {
				clienteActual.setNombre(cliente.getNombre());
				clienteActual.setApellido(cliente.getApellido());
				clienteActual.setDni(cliente.getApellido());
				clienteActual.setEmail(cliente.getEmail());
				clienteActual.setTelefono(cliente.getTelefono());
				clienteActual.setRegion(cliente.getRegion());
				clienteActual.setFoto(cliente.getFoto());
				clienteActual.setFechaIngreso(cliente.getFechaIngreso());
				response.put("mensaje", "Cliente modificado con exito");
				response.put("cliente", clienteService.agregarCliente(clienteActual));
				finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			} catch (DataAccessException e) {

				response.put("mensaje", "ERROR AL MODIFICAR EL CLIENTE");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return finalResponse;
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> borrarCliente(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?> finalResponse;

		try {
			Cliente cliente = clienteService.findById(id);
			uploadService.eliminar(cliente.getFoto());
			clienteService.borrarCliente(id);
			response.put("mensaje", "Cliente eliminado correctamente");
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el cliente");
			response.put("error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		return finalResponse;
	}

	@PostMapping("/clientes/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
		Map<String, Object> response = new HashMap<>();
		Cliente cliente = clienteService.findById(id);
		String nombreArchivo = null;
		ResponseEntity<?> finalResponse;

		if (cliente == null) {
			response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if (!archivo.isEmpty()) {
			try {
				nombreArchivo = uploadService.copiar(archivo);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			uploadService.eliminar(cliente.getFoto());
			cliente.setFoto(nombreArchivo);
			clienteService.agregarCliente(cliente);
			response.put("mensaje", "el cliente ha sido actualizado");
			response.put("cliente", cliente);
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		} else {
			response.put("mensaje", "el archivo esta vacio");
			finalResponse = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		return finalResponse;

	}

	@GetMapping("/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

		Resource recurso = null;

		try {
			recurso = uploadService.cargar(nombreFoto);
		} catch (MalformedURLException e) {

			e.printStackTrace();
		}

		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename	=\"" + recurso.getFilename() + "\"");

		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}

	@Secured("ROLE_ADMIN")
	@GetMapping("/clientes/regiones")
	public List<Region> listarRegiones() {

		return clienteService.getAllRegiones();
	}
}
