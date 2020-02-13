package com.api.backend.sistemafacturacion.models.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.backend.sistemafacturacion.models.dao.IUsuarioDao;
import com.api.backend.sistemafacturacion.models.entity.Usuario;

@Service
public class UsuarioService implements UserDetailsService {

	private Logger logger = LoggerFactory.getLogger(UsuarioService.class);

	@Autowired
	private IUsuarioDao userDao;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = userDao.findByUserName(username);

		if (usuario == null) {
			throw new UsernameNotFoundException(
					"Error en el login: No existe el usuario '" + username + "' en el sistema");
		}

		List<GrantedAuthority> authorities = usuario.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName()))
				.peek(authority -> logger.info("Rol: " + authority.getAuthority())).collect(Collectors.toList());

		return new User(usuario.getUserName(), usuario.getPassword(), usuario.getEnabled(), true, true, true,
				authorities);
	}

}
