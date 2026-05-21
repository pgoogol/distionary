package com.distionary.backend.dictionary;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class DictionaryRepositoryTest {

    @Autowired
    DictionaryRepository repository;

    @Test
    void persistsAndLoadsDictionary() {
        Dictionary d = new Dictionary();
        d.setApiKey("countries");
        d.setName("Countries");
        d.setDescription("ISO 3166 country codes");
        d.setDataSource(DictionarySource.ISO);
        d.setStatus(DictionaryStatus.ACTIVE);

        Dictionary saved = repository.save(d);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getLastModifiedAt()).isNotNull();

        Dictionary fetched = repository.findByApiKey("countries").orElseThrow();
        assertThat(fetched.getName()).isEqualTo("Countries");
        assertThat(fetched.getDataSource()).isEqualTo(DictionarySource.ISO);
        assertThat(fetched.getStatus()).isEqualTo(DictionaryStatus.ACTIVE);
    }

    @Test
    void detectsApiKeyConflict() {
        Dictionary a = new Dictionary();
        a.setApiKey("dup");
        a.setName("First");
        repository.save(a);

        assertThat(repository.existsByApiKey("dup")).isTrue();
        assertThat(repository.existsByApiKey("other")).isFalse();
    }
}
