package com.distionary.backend.dictionary;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {

    Optional<Dictionary> findByApiKey(String apiKey);

    boolean existsByApiKey(String apiKey);
}
