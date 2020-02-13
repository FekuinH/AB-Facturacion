package com.api.backend.sistemafacturacion.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.api.backend.sistemafacturacion.models.entity.Cliente;
import com.api.backend.sistemafacturacion.models.entity.Region;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

	@Query("from Region")
	public List<Region> getAllRegiones();
}
