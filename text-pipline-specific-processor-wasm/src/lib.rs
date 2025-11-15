use wasm_bindgen::prelude::*;

/// Unescapes a string containing escape sequences (e.g., "\\n" -> actual newline).
///
/// # Arguments
/// * `input` - String with escape sequences written as literal characters
///
/// # Returns
/// * `Result<String, JsValue>` - Unescaped string or error converted to JsValue
///
/// # Examples
/// ```
/// let result = unescape_string("Hello\\nWorld").unwrap();
/// assert_eq!(result, "Hello\nWorld");
/// ```
#[wasm_bindgen]
pub fn unescape_string(input: &str) -> Result<String, JsValue> {
    unescape::unescape(input).ok_or_else(|| JsValue::from_str("Failed to unescape string"))
}

// Internal function for testing (without JsValue dependency)
#[cfg(test)]
fn unescape_string_internal(input: &str) -> Result<String, String> {
    unescape::unescape(input).ok_or_else(|| "Failed to unescape string".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_unescape_newline() {
        let input = r"Hello\nWorld";
        let expected = "Hello\nWorld";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_tab() {
        let input = r"Column1\tColumn2";
        let expected = "Column1\tColumn2";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_carriage_return() {
        let input = r"Line1\rLine2";
        let expected = "Line1\rLine2";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_backslash() {
        let input = r"Path\\To\\File";
        let expected = "Path\\To\\File";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_quote() {
        let input = "He said \\\"Hello\\\"";
        let expected = "He said \"Hello\"";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_unicode() {
        let input = r"\u0048\u0065\u006C\u006C\u006F";
        let expected = "Hello";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_mixed_sequences() {
        let input = "First\\nSecond\\tThird\\\"Fourth";
        let expected = "First\nSecond\tThird\"Fourth";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_no_escapes() {
        let input = "Plain text without escapes";
        let expected = "Plain text without escapes";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_empty_string() {
        let input = "";
        let expected = "";
        let result = unescape_string_internal(input).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_unescape_invalid_sequence() {
        // Test case: invalid escape sequence should return error
        let input = r"\x";
        let result = unescape_string_internal(input);
        assert!(result.is_err());
    }
}
