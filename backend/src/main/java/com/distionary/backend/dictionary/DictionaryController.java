package com.distionary.backend.dictionary;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/dictionaries")
public class DictionaryController {

    private final DictionaryService service;

    public DictionaryController(DictionaryService service) {
        this.service = service;
    }

    @GetMapping
    public List<DictionaryDtos.Response> list() {
        return service.listAll().stream().map(DictionaryDtos.Response::from).toList();
    }

    @GetMapping("/{id}")
    public DictionaryDtos.Response get(@PathVariable Long id) {
        return DictionaryDtos.Response.from(service.get(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<DictionaryDtos.Response> create(
            @Valid @RequestBody DictionaryDtos.CreateRequest request,
            UriComponentsBuilder uriBuilder
    ) {
        Dictionary created = service.create(request);
        URI location = uriBuilder.path("/api/dictionaries/{id}").buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(location).body(DictionaryDtos.Response.from(created));
    }
}
