package com.back.back.V1.repository;

import com.back.back.V1.model.UserApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserApp,Long> {
    Optional<UserApp> findByUsername(String username);
    Optional<UserApp> findByEmail (String email);
}
