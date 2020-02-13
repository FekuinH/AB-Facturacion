package com.api.backend.sistemafacturacion.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.backend.sistemafacturacion.models.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long> {

	public Usuario findByUserName(String userName);
	
	
}
