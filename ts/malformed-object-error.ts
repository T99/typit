/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:04 PM -- June 15th, 2019.
 *	Project: typit
 */

import { SpecialType } from "./runtime-types/special-type";
import { Type } from "./runtime-types/type";

/**
 * A special type of {@link Error} that contains information about how a given object was deformed from its expected
 * type.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.6.0
 * @since v0.6.0
 */
export class MalformedObjectError extends Error {
	
	/**
	 * The object path at which the non-conforming value was found.
	 */
	public readonly path: string[];
	
	/**
	 * The human-readable object path at which the non-conforming value was found.
	 */
	public readonly readablePath: string;
	
	/**
	 * The {@link Type} that was expected of the received value.
	 */
	public readonly expectedType: Type;
	
	/**
	 * The actual type of the value that was received.
	 */
	public readonly actualType: Type;
	
	/**
	 * The actual value received that failed to conform to the expected {@link Type}.
	 */
	public readonly actualValue: any;
	
	/**
	 * Initializes a new MalformedObjectError with an error path, expected {@link Type}, and the actual value received.
	 *
	 * @param path The object path at which the non-conforming value was found.
	 * @param expectedType The Type that was expected of the provided value.
	 * @param actualValue The actual value that was received that failed to conform to the expected Type.
	 * @param actualType An optional actual type of the received value if it is already known.
	 */
	public constructor(path: string[], expectedType: Type, actualValue: any, actualType: Type = TypeInferer.infer(actualValue)) {

		super();
		
		this.path = path;
		this.readablePath = "*";
		this.expectedType = expectedType;
		this.actualType = actualType
		this.actualValue = actualValue;
		
		for (let pathItem of path) this.readablePath += "." + pathItem;

	}
	
	/**
	 * Creates and returns a new MalformedObjectError with the provided path prepended to it.
	 *
	 * This method does not modify the existing MalformedObjectError, merely creates a new one.
	 *
	 * @param path The path to prepend onto the beginning of this MalformedObjectError's path.
	 */
	public prependPath(...path: string[]): MalformedObjectError {
		
		path.push(...this.path);
		
		return new MalformedObjectError(path, this.expectedType, this.actualValue);
		
	}
	
	/**
	 * Returns the non-error content of this MalformedObjectError as a JSON object.
	 *
	 * @return The non-error content of this MalformedObjectError as a JSON object.
	 */
	public toJSON(): any {
		
		return {
			
			path: this.path,
			readablePath: this.readablePath,
			expectedType: this.expectedType,
			actualType: this.actualType,
			actualValue: this.actualValue
			
		};
		
	}

}