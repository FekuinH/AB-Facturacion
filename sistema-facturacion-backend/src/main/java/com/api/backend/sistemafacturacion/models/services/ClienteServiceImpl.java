package com.api.backend.sistemafacturacion.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.backend.sistemafacturacion.models.dao.IClienteDao;
import com.api.backend.sistemafacturacion.models.dao.IFacturaDao;
import com.api.backend.sistemafacturacion.models.dao.IProductoDao;
import com.api.backend.sistemafacturacion.models.entity.Cliente;
import com.api.backend.sistemafacturacion.models.entity.Factura;
import com.api.backend.sistemafacturacion.models.entity.Producto;
import com.api.backend.sistemafacturacion.models.entity.Region;

@Service
public class ClienteServiceImpl implements IClienteService {

	@Autowired
	private IClienteDao clienteDao;

	@Autowired
	private IFacturaDao facturaDao;

	@Autowired
	private IProductoDao productoDao;

	@Override
	@Transactional(readOnly = true)
	public List<Cliente> getAll() {

		return (List<Cliente>) clienteDao.findAll();
	}

	@Override
	public Cliente agregarCliente(Cliente cliente) {

		return clienteDao.save(cliente);
	}

	@Override
	public void borrarCliente(Long id) {

		clienteDao.deleteById(id);

	}

	@Override
	public Cliente findById(Long id) {

		return clienteDao.findById(id).orElse(null);
	}

	@Override
	public boolean existById(Long id) {

		return clienteDao.existsById(id);
	}

	@Override
	@Transactional
	public Page<Cliente> getAll(Pageable pageable) {

		return clienteDao.findAll(pageable);

	}

	@Override
	@Transactional
	public List<Region> getAllRegiones() {

		return clienteDao.getAllRegiones();
	}

	@Override
	@Transactional(readOnly = true)
	public Factura findFacturaById(Long id) {

		return facturaDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Factura saveFactura(Factura factura) {

		return facturaDao.save(factura);
	}

	@Override
	@Transactional
	public void deleteFactura(Long id) {

		facturaDao.deleteById(id);

	}

	@Override
	@Transactional(readOnly = true)
	public List<Producto> findProductoByNombre(String nombre) {

		return this.productoDao.findByNombreContainingIgnoreCase(nombre);
	}
}
