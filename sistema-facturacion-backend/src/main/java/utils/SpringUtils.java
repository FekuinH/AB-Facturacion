package utils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;

public class SpringUtils {

	public static List<String> bindingResultToList(BindingResult result) {

		List<String> errors = new ArrayList<>();

		errors = result.getFieldErrors().stream()
				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
				.collect(Collectors.toList());

		return errors;
	}
}
