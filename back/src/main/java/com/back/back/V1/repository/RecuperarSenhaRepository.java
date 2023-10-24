package com.back.back.V1.repository;

import com.back.back.V1.model.RecuperarSenha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecuperarSenhaRepository extends JpaRepository<RecuperarSenha,Long> {
    Optional<RecuperarSenha> findByUserId(Long userId);
}
